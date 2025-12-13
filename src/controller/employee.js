const models = require('../models/employee');
const {uploadToFTP} = require('../service/ftpService');
const generateEmployeeCode = require('../util/generateEmployeeCode');

const getAllEmployee = async (req, res) => {
    try {
    const data = await models.getallEmployee();

    if(!data || data.length == 0) {
        res.status(404).json({
            message: 'Data not found',
            data:[]
        })
    } else {
        res.json({
            message: "Succesfully get employees data",
            data : data
        })
    }

    } catch(err) {
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        })
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await models.getEmployeeById(id);
        if(!data) {
            res.status(404).json({
                message: 'Employee not found',
                data: null
            });
        } else {
            res.json({
                message: 'Succesfully get employee data',
                data: data
            });
        }
    } catch(err) {
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
}

const createEmployee = async (req, res) => {
    try {
        const {employee_name, email, phone, address} = req.body;
        let finalPhotoUrl = null;

        if (req.file) {
            const photoProfileName = await uploadToFTP(req.file.buffer, req.file.originalname);
            finalPhotoUrl = `http://localhost:4000/public-images/${photoProfileName}`;
        }

        const newEmployee = {
            employee_code: await generateEmployeeCode(),
            employee_name,
            email,
            phone,
            address,
            photo_profile: finalPhotoUrl
        }

        const [id] = await models.createEmployee(newEmployee);
        res.status(201).json({
            message: 'Create Employee Successfully',
            data: {id, ...newEmployee}
        });
    } catch (err) {
        console.error('Create Employee Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: err.message
        });
    }
};

module.exports = {
    getAllEmployee,
    createEmployee,
    getEmployeeById
}