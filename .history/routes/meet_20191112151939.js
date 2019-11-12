const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', (req, res) => {
    console.log(`--------------------------- in the meet route`)
    User.findById(req.params.id, (err, user) => {
        res.json(user)
    })
})


module.exports = router;