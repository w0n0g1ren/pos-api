const dbPool = require('../config/database')

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM mst_employee';
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers
}