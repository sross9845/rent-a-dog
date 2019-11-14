const express = require('express');
const router = express.Router();
const User = require('../models/user');

const queryAllUsers = () => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        if(err) //do something...

        users.map(user => {
            //Do somethign with the user
        })
    })
}

module.exports = router;