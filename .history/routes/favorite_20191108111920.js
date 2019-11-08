const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', (req, res) => {
    User.findOne({id: req.params.id})
})


module.exports = router;