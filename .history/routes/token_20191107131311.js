const express = require('express');
const router = express.Router();
const Token = require('../models/token');

router.get('/', (req, res) => {
    res.send('token route')
})



module.exports = router;