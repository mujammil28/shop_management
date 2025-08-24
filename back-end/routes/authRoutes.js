const express = require('express');
const router = express.Router();
const { signup, login, updatePassword } = require('../controllers/authController');
const {verifyToken} = require('../middleware/verifyToken');

router.post('/signup', signup);
router.post('/login', login);
router.put('/update-password', verifyToken, updatePassword);

module.exports = router;
