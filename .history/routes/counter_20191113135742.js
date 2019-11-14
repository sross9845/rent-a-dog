const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        console.log(`====== in compare route ${users}`)
        var myList = []
            users.map(user => {
            //Do somethign with the user
            myList.push(user.favoriteDogs)
        })
        console.log(myList)
        res.json(myList)
    })
})

module.exports = router;