const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myList = []
        var result = []
        var myArray = []

        // get all dogs from all users
        users.map(user => {
            for (dog in user.favoriteDogs) {
                myList.push(user.favoriteDogs[dog].apiID)
                myList.push(user.favoriteDogs[dog].name)
            }
        })

        // get all dogs apiID to incluse name of dogs
            for (let i=0; i<myList.length; i+=2) {
                let myString = myList[i]+myList[i+1]
                myArray.push(myString)
            }

        // associate each apiID+DogName with a number of times refrenced
        var myDogObj = new Object();
        const results = myArray.filter(function(item, index) {
            if (myArray.indexOf(item) === index) {
                return myDogObj[''+item] = 1
            } else {
                return myDogObj[''+item] = myDogObj[''+item] += 1
            }
        })

        // map these values to an array of arrays... and remove everything that isn't a name
        Object.keys(myDogObj).map(function(key) {
            result.push([key.match(/\D/g), myDogObj[key]])
        });

        var finalAwesomeness = []
            for (let i = 0; i < myArray.length; i++) {
            var b;
            // console.log(myArray.length)
            if (i < myArray.length-1) {
                b = i+1
            } else {
                b = 0
            }
            let myCurrentArray = myArray[i][1]
            let myNextArray = myArray[b][1]
            if (myCurrentArray > myNextArray) {
                let arrayToUnshift = myArray[i].splice(0, 2)
                finalAwesomeness.unshift(arrayToUnshift)
                myArray.unshift(arrayToUnshift)
            } else {
                let arrayToUnshift = myArray[i].splice(0, 2)
                finalAwesomeness.push(arrayToUnshift)
            }
            }

        /// send the data to ront end for display
        console.log(result)
        res.json(result)
    })
})

module.exports = router;