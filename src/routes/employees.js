const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();
const employeeController = require('../controller/employee');

router.get('/', employeeController.getAllEmployee);

router.post('/', upload.single('photo_profile'), employeeController.createEmployee);

router.get('/:id', employeeController.getEmployeeById);

module.exports = router;