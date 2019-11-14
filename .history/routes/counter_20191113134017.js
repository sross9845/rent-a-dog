const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        console.log(users)
        users.map(user => {
            //Do somethign with the user
        })
    })
})

module.exports = router;