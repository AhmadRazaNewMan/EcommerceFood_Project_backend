const express = require('express');
const { addBillsController ,getBillsController} = require('../controllers/billsContoller');

const router = express.Router();

// Route - POST Method
router.post('/add-bills',addBillsController);
// Route - Get

router.get('/get-bills',getBillsController);





module.exports = router;