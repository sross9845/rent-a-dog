const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/:uid/:name/:id', (req, res) => {
    console.log('-------------------- in the favourite route', req.params.id)
    User.findById(req.params.uid, (err, user) => {
        console.log(user.favoriteDogs)
        user.favoriteDogs.push({
            apiID: req.params.id,
            name: req.params.name,
        })
        console.log(user.favoriteDogs)
    })
})

router.get('/:uid', (req, res) => {
    console.log('-------------------------- hitting the get favorites route')
    User.findById(req.params.uid, (err, user) => {
        res.json(user)
    })
})


module.exports = router;