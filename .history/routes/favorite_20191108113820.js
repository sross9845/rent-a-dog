const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/:uid/:name/:id', (req, res) => {
    User.findById(req.params.uid, (err, user) => {
        user.favoriteDogs.push({
            name: req.params.name,
            id: req.params.id
        })
    })
})


module.exports = router;