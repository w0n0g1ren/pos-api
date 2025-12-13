const trCashierModels = require('../models/trCashierModels');
const generateTrCashierCode = require('../util/generateTrCashierCode');

const getAllTrCashiers = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await trCashierModels.getAllTrCashier(startDate, endDate);
        if (!data || data.length === 0) {
            res.status(404).json({
                message: 'No transactions found',
                data: []
            });
        } else {
            res.json({
                message: 'Successfully retrieved all transactions',
                data: data
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
}

const getTrCashierById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                message: 'Transaction ID is required',
                data: null
            });
        } else {
            const { id } = req.params;
            const data = await trCashierModels.getAllTrChasierById(id);
            if (!data) {
                res.status(404).json({
                    message: 'Transaction not found',
                    data: null
                });
            } else {
                res.json({
                    message: 'Successfully retrieved transaction data',
                    data: data
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
}

const createTrCashier = async (req, res) => {
    try {
        const {
            total_amount,
            payment_amount,
            change_amount,
            cashier_id,
            transaction_date,
            items
        } = req.body;

        const newtTrCashier = {
            transaction_code: await generateTrCashierCode(),
            total_amount,
            payment_amount,
            change_amount,
            cashier_id,
            transaction_date,
            items
        }

        const id = await trCashierModels.createTrCashier(newtTrCashier);
        res.status(201).json({
            message: 'Transaction created successfully',
            data: { id, ...newtTrCashier }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
}

module.exports = {
    getAllTrCashiers,
    getTrCashierById,
    createTrCashier
};