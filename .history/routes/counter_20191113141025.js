const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myList = []
        var myList = users.map(user => {
            for (dog in user.favoriteDogs) {
                return user.favoriteDogs[dog].name
            }
        })
        console.log(myList)
        res.json(myList)
    })
})

module.exports = router;