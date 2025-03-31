const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers, createUser, updateUser, deleteUser, sendPassword, addProfileImage } = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");
const { uploadFile } = require("../middleware/uploads");

// Get all users - protected route
router.get('/', verifyToken, (req, res) => {
    getUsers(req, res);
});

// Create new user - protected route
router.post('/', verifyToken, (req, res) => {
    createUser(req.body, res);
});

// User login
router.post('/login', (req, res) => {
    loginUser(req, res);
});

// User registration
router.post('/register', (req, res) => {
    registerUser(req, res);
});

// Update user info - protected route
router.put('/:id', verifyToken, (req, res) => {
    updateUser(req, res);
});

// Delete user - protected route
router.delete('/:id', verifyToken, (req, res) => {
    deleteUser(req, res);
});

// Send password reset
router.post('/sendpw', (req, res) => {
    sendPassword(req, res);
});

module.exports = router;
