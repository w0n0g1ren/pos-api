const dbPool = require('../config/database')

const getallEmployee = () => {
    return dbPool('mst_employee').select('*');
}

const getEmployeeById = (id) => {
    return dbPool('mst_employee').where('id', id).first();
}

const createEmployee = (data) => {
    return dbPool('mst_employee').insert(data);
}

module.exports = {
    getallEmployee,
    createEmployee,
    getEmployeeById
}