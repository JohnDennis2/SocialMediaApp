const express = require('express');
const userController = require('./userController');
const thoughtController = require('./thoughtController');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUserById);
router
