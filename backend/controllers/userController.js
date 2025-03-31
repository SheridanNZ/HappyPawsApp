const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Generate JWT token (reusable)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Create user and return standardized response
const createUserResponse = (user) => ({
  _id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  token: generateToken(user.id),
});

// Check if user exists and throw error if they do
const checkUserExists = async (email) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }
};

// Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  await checkUserExists(email);
  const user = await User.create({ firstName, lastName, email, password });
  
  res.status(201).json(createUserResponse(user));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json(createUserResponse(user));
});

// Get all users (protected route)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Create a new user (similar to register)
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  await checkUserExists(email);
  const user = await User.create({ firstName, lastName, email, password });
  
  res.status(201).json(createUserResponse(user));
});

// Update user information (protected route)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update only provided fields
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;

  const updatedUser = await user.save();
  res.json(createUserResponse(updatedUser));  // return updated user details with token
});

// Delete user (protected route)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.deleteOne();
  res.json({ message: 'User removed successfully' });
});

// Password reset (stub for actual email service)
const sendPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Logic for sending a password reset email goes here
  res.json({ message: 'Password reset email sent (implementation pending)' });
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  sendPasswordReset,
};
