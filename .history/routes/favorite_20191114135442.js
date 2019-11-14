const express = require('express');
const router = express.Router();
const User = require('../models/user');

    // Post new favourite dog to database
    router.post('/savephoto', (req, res) => {
        User.findById(req.body.userID, (err, user) => {
            user.favoriteDogs.push({
                apiID: req.body.apiID,
                name: req.body.name,
                photo: req.body.photo,
                email: req.body.contactEmail,
                phone: req.body.contactPhone,
                city: req.body.contactCity,
                state: req.body.contactState,
                status: req.body.status
            })
            user.save()
        })
    })

    // Delete a favourite
    router.get('/:uid/:id', (req, res) => {
        User.findById(req.params.uid, (err, user) => {
            let subID = user.favoriteDogs.id(req.params.id);
            subID.remove();
            user.save()
            res.json(user.favoriteDogs)
        })
    })

    // Retrieve all favourited dogs from database
    router.get('/getuser/random/:uid', (req, res) => {
        User.findById(req.params.uid, (err, user) => {
            res.json(user)
        })
    })



module.exports = router;