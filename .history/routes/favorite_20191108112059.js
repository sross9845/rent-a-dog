const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:uid//:name:id', (req, res) => {
    User.findById(req.params.uid, (err, user) => {
        user.favoriteDogs.push()
    })
})


module.exports = router;