const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

// Routes - GET method
router.get('/get-item', itemController.getItemController);

// Routes - POST Method
router.post('/post-item', itemController.addPostItems);

// Update Method
router.put('/edit-item',itemController.editItemController)

// delete Item
router.post('/delete-item',itemController.deleteItemController)

module.exports = router;
