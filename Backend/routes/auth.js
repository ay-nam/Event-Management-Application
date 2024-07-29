// routes/auth.js
const express = require('express');
const { signupUser, loginUser, adminLogin,getUserDetails } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/admin-login',adminLogin);
router.post('/login', loginUser);
router.get('/user/:id', authenticateToken,getUserDetails);

module.exports = router;