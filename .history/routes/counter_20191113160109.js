const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myDogNameList = []
        var finalResults = []
        var myList = users.map(user => {
            for (dog in user.favoriteDogs) {
                return user.favoriteDogs[dog].apiID
            }
        })
        var myDogObj = new Object();
        const results = myList.filter(function(item, index) {
            if (myList.indexOf(item) === index) {
                return myDogObj[''+item] = 1
            } else {
                return myDogObj[''+item] = myObj['item'+item] += 1
            }
        })
        var result = Object.keys(myDogObj).map(function(key) {
            return [key, myDogObj[key]];
        });
        for (let i=0; i < myDogNameList.length; i++) {
            // console.log(i, Math.abs(i-result.length))
            // console.log(myDogNameList[i], result[Math.abs(i-result.length)])
            if (myDogNameList[i] === result[Math.abs(i-result.length)]) {
                result[i].splice(i, 1, myDogNameList[i+1])
                console.log('splicing occurred')
                return result
            }
        }
        res.json(result)
    })
})

module.exports = router;