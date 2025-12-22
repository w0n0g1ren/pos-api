const itemModel = require('../models/itemModels');
const generateItemCode = require('../util/generateItemCode');

const getAllItems = async (req, res) => {
    try {
        const data = await itemModel.getAllItems();
        if (!data || data.length === 0) {
            res.status(404).json({
                message: 'No item data found',
                data: []
            });
        } else {
            res.json({
                message: 'Successfully retrieved all item data',
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

const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await itemModel.getItemById(id);
        if (!data) {
            res.status(404).json({
                message: 'Item not found',
                data: null
            });
        } else {
            res.json({
                message: 'Successfully retrieved item data',
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

const createItem = async (req, res) => {
        try {
            const {item_name, uom_id, price, quantity} = req.body;
            const newItem = {
                item_code: await generateItemCode(),
                item_name,
                uom_id,
                price,
                quantity
            };
            const [id] = await itemModel.createItem(newItem);
            res.status(201).json({
                message: 'UOM created successfully',
                data: { id, ...newItem }
            });
        } catch (err) {
            res.status(500).json({
                message: 'Internal Server Error',
                server_error_message: err.message
            });
        }
}

const updateQuantityItem = async (req, res) => {
    try {
        const { quantity, item_id } = req.body;
        const data = await itemModel.updateQuantityItem(item_id, quantity);
        if (!data) {
            res.status(404).json({
                message: 'Item not found',
                data: null
            });
        } else {
            res.json({
                message: 'Successfully updated item quantity',
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

module.exports = {
    getAllItems,
    createItem,
    getItemById,
    updateQuantityItem
}