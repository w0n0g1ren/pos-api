const dbPool = require('../config/database');

const getAllItems = async () => {
    const rows = await dbPool('mst_item').select('*').leftJoin('mst_uom', 'mst_item.uom_id', 'mst_uom.id').select('mst_item.*', 'mst_uom.id as uom_id', 'mst_uom.uom_code', 'mst_uom.uom_name');
    if (rows) {
        const formattedResult = rows.map((row) => {
            return {
                id: row.id,
                item_code: row.item_code,
                item_name: row.item_name,
                price: row.price,
                quantity: row.quantity,
                uom: {
                    id: row.uom_id,
                    uom_code: row.uom_code,
                    uom_name: row.uom_name,
                }
            }
        });
        return formattedResult;
    } else {
        return null;
    }
}

const getItemById = async (id) => {
    const result = await dbPool('mst_item').where('mst_item.id', id).leftJoin('mst_uom', 'mst_item.uom_id', 'mst_uom.id').select('mst_item.*', 'mst_uom.id as uom_id', 'mst_uom.uom_code', 'mst_uom.uom_name', 'mst_uom.description').first();
    if (result) {
        const formattedResult = {
            id: result.id,
            item_code: result.item_code,
            item_name: result.item_name,
            price: result.price,
            quantity: result.quantity,
            uom: {
                id: result.uom_id,
                uom_code: result.uom_code,
                uom_name: result.uom_name,
                description: result.description
            }
        }
        return formattedResult;
    } else {
        return null;
    }
}

const createItem = (data) => {
    return dbPool('mst_item').insert(data);
}

const updateQuantityItem = async (id, quantity) => {
    await dbPool('mst_item').where('id', id).increment('quantity', quantity);
    const data = await dbPool('mst_item').where('id', id).first();
    return data;
}
module.exports = {
    getAllItems,
    createItem,
    getItemById,
    updateQuantityItem
}