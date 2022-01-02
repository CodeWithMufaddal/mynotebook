const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a User using Post "/api/auth" Doesn't requair Authorization
router.post('/', (req, res) => {

   const user = User(req.body);
   user.save();
   res.send(user);
})



module.exports = router