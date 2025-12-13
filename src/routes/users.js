const express = require('express');

const router = express.Router();
const userController = require('../controller/users.js')

//create user
router.post('/', userController.createNewUsers);

//get users
router.get('/', userController.getAllUsers);

//update users
router.patch('/:id',  userController.updateUser);

router.delete('/:id', userController.deleteUsers);

module.exports = router;

