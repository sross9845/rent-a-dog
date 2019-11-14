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
        var myArray = []
        users.map(user => {
            for (dog in user.favoriteDogs) {
                myList.push(user.favoriteDogs[dog].apiID)
                myList.push(user.favoriteDogs[dog].name)
                // myDogNameList.push(user.favoriteDogs[dog].name)
            }
        })
            for (let i=0; i<myList.length; i+=2) {
                let myString = myList[i]+myList[i+1]
                myArray.push(myString)
            }
        console.log(myArray)
        var myDogObj = new Object();
        const results = myArray.filter(function(item, index) {
            if (myList.indexOf(item) === index) {
                return myDogObj[''+item] = 1
            } else {
                return myDogObj[''+item] = myObj['item'+item] += 1
            }
        })
        Object.keys(myDogObj).map(function(key) {
            result.push(key, myDogObj[key])
        });
        // // at this point have a touple of sorted uniques
        // for (let i=0; i < myDogNameList.length; i++) {
        //     var iterator = myDogNameList.length-i
        //     console.log(iterator, i)
        //     if (myDogNameList[i] === result[i] || myDogNameList[i] === result[iterator] || myDogNameList[i] === result[i + 1] || myDogNameList[i] === result[i+2])
        //     {
        //         result.splice(i, 1, myDogNameList[i])
        //         finalResult.push([myDogNameList[i+1], result[i+1]])
        //     }
        // }
        // console.log(finalResult)
        res.json(finalResult)
    })
})

module.exports = router;