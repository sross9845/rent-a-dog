const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:uid/:id', (req, res) => {
    User.findById(req.params.uid)
})


module.exports = router;