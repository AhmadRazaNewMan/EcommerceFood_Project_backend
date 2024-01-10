const express = require('express');
const AuthController = require('../controllers/userController');

const router = express.Router();

// Routes - GET method
router.post('/login', AuthController.loginController);

// Routes - POST Method
router.post('/register', AuthController.registerController);


module.exports = router;
