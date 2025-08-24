const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');
const { getStoreRatings } = require('../controllers/ownerController');

router.use(verifyToken, authorizeRole(['owner']));

router.get('/ratings', getStoreRatings);

module.exports = router;
