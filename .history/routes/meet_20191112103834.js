const express = require('express');
const router = express.Router();
const User = require('../models/user');
const axios = require('axios');

router.get('/meet/:uid/:id', (req, res) => {
    User.findById(req.params.uid)
})


module.exports = router;