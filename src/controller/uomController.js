const uomModel = require('../models/uomModels');

const getAllUom = async (req, res) => {
    try {
        const data = await uomModel.getAllUom();

        if (!data || data.length === 0) {
            res.status(404).json({
                message: 'No UOM data found',
                data: []
            });
        } else {
        res.json({
            message: 'Successfully retrieved all UOM data',
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

const getUomById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await uomModel.getUomById(id);
        if (!data) {
            res.status(404).json({
                message: 'UOM not found',
                data: null
            });
        } else {
            res.json({
                message: 'Successfully retrieved UOM data',
                data: data
            });
        }
    }
        catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
}

const createUom = async (req, res) => {
    try {
        const {uom_code, uom_name,description} = req.body;
        const newUom = {
            uom_code,
            uom_name,
            description
        };
        const [id] = await uomModel.createUom(newUom);
        res.status(201).json({
            message: 'UOM created successfully',
            data: { id, ...newUom }
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
}

module.exports = {
    getAllUom,
    getUomById,
    createUom
}