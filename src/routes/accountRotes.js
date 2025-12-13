const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController.js');

router.post('/', accountController.createAccount);

module.exports = router;