const { default: knex } = require('knex');
const dbPool = require('../config/database');
const e = require('cors');

const getAllTrCashier = async (startDate, endDate) => {
    const rows = await dbPool('tr_cashier').select("*")
    .modify((queryBuilder) => {
        if (startDate && endDate) {
            queryBuilder.whereBetween('transaction_date', [startDate, endDate]);
        }
    });
    return rows;
}

const getAllTrChasierById = async (id) => {
    const trResult = await (dbPool('tr_cashier').where('tr_cashier.id', id)).
    select('tr_cashier.id', 'tr_cashier.transaction_code', 'tr_cashier.total_amount', 'tr_cashier.payment_amount', 'tr_cashier.change_amount',
    'tr_cashier.cashier_id', 'tr_cashier.transaction_date', 'tr_cashier.is_active', dbPool.raw("DATE_FORMAT(tr_cashier.transaction_date, '%Y-%m-%d') as transaction_date"))
    .first();
    
    if (!trResult) {
        return null; 
    }
    
    const employee = await dbPool('mst_employee').where('id', trResult.cashier_id).
    select('mst_employee.id', 'mst_employee.employee_name', 'mst_employee.employee_code')
    .first();
    if (employee == null) {
        trResult.cashier = null;
    } else {
        trResult.cashier = employee
    }

    const rawitems = await dbPool('tr_cashier_item')
    .where('tr_cashier_item.tr_cashier_id', id)
    .leftJoin('mst_item', 'tr_cashier_item.item_id', 'mst_item.id')
    .leftJoin('mst_uom', 'mst_item.uom_id', 'mst_uom.id')
    .select(
        'tr_cashier_item.*',
        'mst_item.id as item_id',
        'mst_item.item_code as item_code',
        'mst_item.item_name as item_name',
        'mst_item.price as item_price',
        'mst_uom.uom_code as uom_code',
        'mst_uom.uom_name as uom_name'
    )

        const trItemResults = rawitems.map(row => {

        const { 
            item_id, item_code, item_name, price,
            uom_id, uom_code, uom_name,       
            ...transItemData                         
        } = row;

        return {
            ...transItemData,
            item: {
                id: item_id,
                code: item_code,
                name: item_name,
                price: price,
                uom: {
                    id: uom_id,
                    code: uom_code,
                    name: uom_name
                }
            },
        };
        });

    trResult.items = trItemResults
    return trResult;
}

const createTrCashier = async (data) => {
    return await dbPool.transaction(async (trx) => {
        
        const trPayload = {
            transaction_code: data.transaction_code,
            total_amount: data.total_amount,
            payment_amount: data.payment_amount,
            change_amount: data.change_amount,
            cashier_id: data.cashier_id,
            transaction_date: data.transaction_date,
        }

        const [trCashierId] = await trx('tr_cashier').insert(trPayload).returning('id');

        const trCashierItemPayloads = data.items.map((item) => ({
            item_id: item.item_id,
            tr_cashier_id: trCashierId,
            quantity: item.quantity,
            price: item.price,
            total_price: item.total_price,
        }));

        await trx('tr_cashier_item').insert(trCashierItemPayloads);

        for (const item of data.items) {
            await trx('mst_item')
                .where('id', item.item_id)
                .decrement('quantity', item.quantity);
        }
        return trCashierId;
    });
}

module.exports = {
    getAllTrCashier,
    getAllTrChasierById,
    createTrCashier
}