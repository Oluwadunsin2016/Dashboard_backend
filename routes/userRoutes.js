const express = require('express');
const { registerUser, loginUser, getAllUsers, getLoggedInUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', getLoggedInUser);
router.get('/all', getAllUsers);

module.exports = router;