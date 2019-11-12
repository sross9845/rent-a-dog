const express = require('express');
const router = express.Router();
const User = require('../models/user');
const axios = require('axios');

router.get('/meet/saved/:uid/', (req, res) => {
    User.findById(req.params.uid, (err, user) => {
        
    })
})


module.exports = router;