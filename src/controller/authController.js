const accountModels = require('../models/accountModels.js');
const bcrypt = require('bcryptjs');
const login = async (req, res) => {
    try {
        const { account_name, account_password } = req.body;
        const accountData = await accountModels.getAccountByAccountName(account_name);
        if (!accountData) {
            return res.status(400).json({ message: 'Invalid account name or password' });
        }

        const isPasswordValid = await bcrypt.compare(account_password, accountData.account_password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid account name or password' });
        }

        else {
            res.json({
                message: 'Login successful',
                data: {
                    account_id: accountData.account_id,
                    account_name: accountData.account_name,
                    employee_id: accountData.employee_id
                }
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
    login
};