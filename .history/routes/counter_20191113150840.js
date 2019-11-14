const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myList = []
        users.map(user => {
            for (dog in user.favoriteDogs) {
                myList.push(user.favoriteDogs[dog].apiID)
            }
        })
        var myDogObj = new Object();
            const results = myList.filter(function(item, index) {
                if (myList.indexOf(item) === index) {
                    return myDogObj['item'+item] = 1
                } else {
                    return myDogObj['item'+item] = myObj['item'+item] += 1
                }
            })
            var result = Object.keys(obj).map(function(key) {
                return [Number(key), obj[key]];
              });
        console.log(myDogObj)
        res.json(myList)
    })
})

module.exports = router;