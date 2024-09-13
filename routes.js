// src/routes.js
const express = require('express');
const userController = require('./userControllers');
const router = express.Router();

router.get('/users', userController.getUsers);

module.exports = router;
