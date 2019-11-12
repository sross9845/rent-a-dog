const express = require('express');
const router = express.Router();
const User = require('../models/user');

    // Post new favourite dog to database
    router.post('/savephoto', (req, res) => {
        console.log(req.body)
        User.findById(req.body.userID, (err, user) => {
            user.favoriteDogs.push({
                apiID: req.body.apiID,
                name: req.body.name,
                photo: req.body.photo
            })
            user.save()
            console.log(user.favoriteDogs)
        })
    })

    // Retrieve all favourited dogs from database
    router.get('/:id', (req, res) => {
        console.log('-------------------------- hitting the get favorites route', req.params.uid)
        User.findById(req.params.uid, (err, user) => {
            res.json(user)
        })
    })

    // Delete a favourite
    router.delete('/:uid')


module.exports = router;