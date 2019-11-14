const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myList = users.map(user => {
            for (dog in user.favoriteDogs) {
                return user.favoriteDogs[dog].apiID
            }
            //Do somethign with the user
            
        })
        console.log(myList)
        res.json(myList)
    })
})

module.exports = router;