const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myList = []
        var myDogNameList = []
        var result = []
        var finalResult = []
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
        Object.keys(myDogObj).map(function(key) {
            result.push(key, myDogObj[key])
        });
        for (let i=0; i < myDogNameList.length; i++) {
            var iterator = myDogNameList.length-i
            console.log(iterator, i)
            if (myDogNameList[i] === result[i]) {
                result.splice(i, 1, myDogNameList[i])
                finalResult.push(myDogNameList[i+1], result[i])
            } else if (myDogNameList[i] === result[iterator]) {
                finalResult.push(myDogNameList[i+1], result[i+1])
            }
        }
        console.log(finalResult)
        res.json(result)
    })
})

module.exports = router;