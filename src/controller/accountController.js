const accountModels = require('../models/accountModels.js');
const employeeModels = require('../models/employee.js');
const bcrypt = require('bcryptjs');

const createAccount = async (req, res) => {
    try {
        const { account_name, account_password, employee_id } = req.body;
        const dataEmployee = await employeeModels.getEmployeeById(employee_id);

        if (!dataEmployee) {
            return res.status(400).json({ message: 'Invalid employee ID' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(account_password, salt);

        const newAccount = {
            account_name,
            account_password: hashedPassword,
            employee_id,
            account_photo_profile : "http://localhost:4000/public-images/default-profile.png"
        };
        await accountModels.createAccount(newAccount);
        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
};

module.exports = {
    createAccount
};