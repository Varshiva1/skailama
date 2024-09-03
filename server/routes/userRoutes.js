import express from 'express';
import {
    createUser,
    loginUser,
  } from '../controllers/userController.js';
  
  const router = express.Router();
  
  // Signup User Route
  router.post('/signup', createUser);
   
  
  // Login User Route
  router.post('/login', loginUser);

  export default router;