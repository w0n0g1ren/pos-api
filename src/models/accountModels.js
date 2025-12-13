const dbPool = require('../config/database.js');
const db = require('../config/database');

const createAccount = async (data) => {
    return dbPool('mst_account').insert(data);
}

const getAccountByAccountName = (account_name) => {
    return db('mst_account').where('account_name', account_name).first();
}

const getAccountByEmployeeId = (id) => {
    return db('mst_account').where('employee_id', id).first();
}

const updateBearerToken = (account_id, bearer_token) => {
    return db('mst_account').where('id', account_id).update({ bearer_token });
}
module.exports = {
    createAccount,
    getAccountByAccountName,
    getAccountByEmployeeId
};