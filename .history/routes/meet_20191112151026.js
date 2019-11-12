const express = require('express');
const router = express.Router();
const User = require('../models/user');
const axios = require('axios');

router.get('/meet/:id', (req, res) => {
    User.findById(req.params.uid, (err, user) => {
        res.json()
    })
})


module.exports = router;