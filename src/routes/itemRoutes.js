const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');

router.get('/', itemController.getAllItems);

router.get('/:id', itemController.getItemById);

router.post('/', itemController.createItem);

router.patch('/quantity', itemController.updateQuantityItem);

module.exports = router;