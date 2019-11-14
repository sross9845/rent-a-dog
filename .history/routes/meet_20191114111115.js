const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/:id', (req, res) => {
    console.log(`--------------------------- in the meet route`)
    User.findById(req.params.id, (err, user) => {
        res.json(user)
    })
})


module.exports = router;