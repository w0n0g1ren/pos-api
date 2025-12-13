require('dotenv').config();
const accountModels = require('../models/accountModels.js');
const employeeModels = require('../models/employee.js');
const bcrypt = require('bcryptjs');
const {uploadToFTP} = require('../service/ftpService');
const jwt = require('jsonwebtoken');

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

        const payload = {
            account_name: accountData.account_name,
            timestamp: Date.now()
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
        });
            res.json({
                message: 'Login successful',
                data: {
                    account_id: accountData.account_id,
                    account_name: accountData.account_name,
                    employee_id: accountData.employee_id,
                    credential: {
                        token: token,
                        type: 'Bearer'
                    }
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

const register = async (req, res) => {
    try {
        const { account_name, account_password, employee_code} = req.body;
        let finalPhotoUrl = null;
        
        const getEmployeeId = await employeeModels.getEmployeeByEmployeeCode(employee_code);
        if (!getEmployeeId) {
            return res.status(400).json({ message: 'Employee code not found' });
        }

        const existingAccount = await accountModels.getAccountByEmployeeId(getEmployeeId.id);
        if (existingAccount) {
            return res.status(400).json({ message: 'Account for this employee already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(account_password, salt);

        if (req.file == null) {
            finalPhotoUrl = null;
        } else {
            const photoProfileName = await uploadToFTP(req.file.buffer, req.file.originalname);
            finalPhotoUrl = `${process.env.BASE_URL_IMAGE}${photoProfileName}`;
        }

        const newAccountData = {
            account_name,
            account_password: hashedPassword,
            employee_id: getEmployeeId.id,
            account_photo_profile: finalPhotoUrl
        }
        const createAccount = await accountModels.createAccount(newAccountData);
        return res.status(201).json({
            message: 'Account created successfully',
            data: {
                account_id: createAccount[0],
                account_name: account_name,
                employee_id: getEmployeeId.id,
                account_photo_profile: finalPhotoUrl
            }
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
};
module.exports = {
    login,
    register
};