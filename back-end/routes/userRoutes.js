const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');
const { getStores, submitRating } = require('../controllers/userController');

router.use(verifyToken, authorizeRole(['user']));

router.get('/stores', getStores);
router.post('/rating', submitRating);

module.exports = router;
