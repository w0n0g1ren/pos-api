
const dbPool = require('../config/database');

const getDashboardData = async (employee_code) => {
    const userData =  await dbPool('mst_employee').select('*').where('employee_code', employee_code).first();
    const userAccount = await dbPool('mst_account').select('id', 'account_name', 'account_photo_profile', 'is_active').where('employee_id', userData.id).first();
    const totalTransaction = await dbPool('tr_cashier').count('* as total').first();
    const totalItem = await dbPool('mst_item').count('* as total').first();

    return {
        employee_data: userData,
        employee_account: userAccount,
        total_transaction: totalTransaction.total,
        total_item: totalItem.total
    }
}

module.exports = {
    getDashboardData
}
