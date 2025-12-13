const express = require('express');
const router = express.Router();
const uomController = require('../controller/uomController');

// get all UOMs
router.get('/', uomController.getAllUom);

// get UOM by id
router.get('/:id', uomController.getUomById);

// create new UOM
router.post('/', uomController.createUom);

module.exports = router;