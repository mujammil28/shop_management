const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Dashboard stats
router.get('/dashboard', adminController.getDashboard);

// Users list
router.get('/users', adminController.getUsers);

// Stores list
router.get('/stores', adminController.getStores);

// Add user
router.post('/users', adminController.addUser);

// Add store
router.post('/stores', adminController.addStore);

module.exports = router;
