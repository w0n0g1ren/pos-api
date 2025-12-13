const dbPool = require('../config/database')

const getAllUom =() => {
    return dbPool('mst_uom').select('*');
}

const getUomById = (id) => {
    return dbPool('mst_uom').where('id', id).first();
}

const createUom = (data) => {
    return dbPool('mst_uom').insert(data);
}

module.exports = {
    getAllUom,
    createUom,
    getUomById
}