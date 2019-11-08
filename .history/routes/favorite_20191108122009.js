const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/:uid/:name/:id', (req, res) => {
    console.log('-------------------- in the favourite route')
    User.findById(req.params.uid, (err, user) => {
        console.log(user.favoriteDogs)
        user.favoriteDogs.push({
            name: req.params.name,
            id: req.params.id
        })
    })
})


module.exports = router;