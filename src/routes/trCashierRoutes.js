const express = require('express');
const router = express.Router();
const trCashierController = require('../controller/trCashierController');

// get all tr_cashier with optional date range filtering
router.get('/', trCashierController.getAllTrCashiers);
// get tr_cashier by id
router.get('/:id', trCashierController.getTrCashierById);
// create new tr_cashier
router.post('/', trCashierController.createTrCashier);

module.exports = router;