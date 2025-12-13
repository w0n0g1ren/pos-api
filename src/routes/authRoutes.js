const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const accountController = require('../controller/authController.js');

router.post('/login', accountController.login);

router.post('/register', upload.single('photo_profile'), accountController.register);

module.exports = router;