const controller = require('../controller/dashboardController');
const express = require('express');
const router = express.Router();

router.get('/:employee_code', controller.getDashboardData);

module.exports = router;