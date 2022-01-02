const express = require('express');
const router = express.Router();
const Notes = require('../models/notes.js');


router.get('/', (req, res) => {

   const notes = Notes(req.body);
   notes.save();
   alert("Notes saved successfully")

})

module.exports = router;