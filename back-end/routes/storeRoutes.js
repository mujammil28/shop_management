const express = require('express');
const router = express.Router();
const  {getStores}  = require('../controllers/storeController');
const { verifyToken } = require('../middleware/verifyToken');

// Fetch all stores
router.get('/', verifyToken, getStores);


module.exports = router;
