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

        // var finalAwesomeness = []
        //     for (let i = 0; i < result.length; i++) {
        //     var b;
        //     // console.log(result.length)
        //     if (i < result.length-1) {
        //         b = i+1
        //     } else {
        //         b = 0
        //     }
        //     let myCurrentArray = result[i][1]
        //     let myNextArray = result[b][1]
        //     if (myCurrentArray > myNextArray) {
        //         let arrayToUnshift = result[i].splice(0, 2)
        //         finalAwesomeness.unshift(arrayToUnshift)
        //         result.push(arrayToUnshift)
        //         } else {
        //             let arrayToUnshift = result[i].splice(0, 2)
        //             finalAwesomeness.unshift(arrayToUnshift)
        //         }
        //     }

        /// send the data to ront end for display
        console.log(finalAwesomeness)
        res.json(finalAwesomeness)
    })
})

module.exports = router;