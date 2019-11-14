const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myList = []
        var myDogNameList = []
        var finalResults = []
        users.map(user => {
            for (dog in user.favoriteDogs) {
                myList.push(user.favoriteDogs[dog].apiID)
                myDogNameList.push(user.favoriteDogs[dog].apiID)
                myDogNameList.push(user.favoriteDogs[dog].name)
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
            return key, myDogObj[key];
        });
        for (let i=0; i < myDogNameList.length; i++) {
            var iterator = i-myDogNameList[i]
            console.log(myDogNameList[i], result[iterator])
            if (myDogNameList[i] === result[iterator][0] || myDogNameList[i] === result[iterator][0]) {
                let result[iterator]
                result[iterator][0].splice(i, 1, myDogNameList[i+1])
                console.log('splicing occurred')
                return result
            }
        }
        res.json(result)
    })
})

module.exports = router;