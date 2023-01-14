const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../Controllers/userController');


// Login Route
router.post('/login', loginUser);

// Singup Route
router.post('/signup', signupUser);


module.exports = router;