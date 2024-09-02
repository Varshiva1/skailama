import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = '1234';

// Create User
export const createUser = async (req, res) => {
  try {
    const { name, mobileNo, email, password } = req.body; // Added mobileNo
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user with hashed password
    const newUser = await User.create({
      name,
      mobileNo, // Included mobileNo
      email,
      password: hashedPassword,
    });
    
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🚀 ~ loginUser ~ password:", password);
    console.log("🚀 ~ loginUser ~ email:", email);
    
    // Find user by email
    const user = await User.findOne({ email });
    console.log("🚀 ~ loginUser ~ user:", user);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🚀 ~ loginUser ~ isMatch:", isMatch);
    
    // Check if password matches
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1d',
    });
    
    // Respond with the token and user info
    res.status(200).json({ token, email, name: user.name, id: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
