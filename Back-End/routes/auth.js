const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const JwtSecKey = process.env.JWT_SECRET_KEY



// Create a User using Post "/api/auth/createuser" No Login require
router.post('/createuser', [
   body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

   body('email').isEmail().withMessage('Invelid Email Format'),

   body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], async (req, res) => {
   // Express validation 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try { //wrap it under try catch

      // Check if user already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ errors: [{ msg: 'User already exist' }] });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //Creating a new user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword,
      })

      // Return jsonwebtoken
      const payload = {
         user: {
            id: user.id
         }
      }
      jwt.sign(payload, JwtSecKey, { expiresIn: 360000 }, (err, token) => {
         if (err) throw err;
         res.json({ token });
      });



   } catch (err) {
      //if error couse by server side
      console.error(err.message);
      res.status(500).send('Server Error');
   }
})



module.exports = router