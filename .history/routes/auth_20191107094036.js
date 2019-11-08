const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/signup', (req,res) => {
    //see if email is in database
    User.findOne({email:req.body.email}, (err,user) => {
        //if yes return an error
        if (user) {
            res.json({
                type: 'error',
                message: 'Email already in database'
            })
        } else {
            //if no create user
            let user = new User(req.body)
            //save user
            user.save((err, user) => {
                if(err) {
                    res.json({
                        type: 'error',
                        message: 'Database error creating user',
                        error: err
                    })
                } else {
                    //sign a token
                    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                        expiresIn: '1d'
                    });
                    //return token
                    res.status(200).json({
                        type: 'success',
                        user: user.toObject(),
                        token
                    })
                }
            })
        }
    })
})
router.post('/login', (req,res) => {
    // Find the user in the db
    User.findOne({email: req.body.email}, (err, user ) => {
        // if no user return an error
        if (!user){
            res.json({
                type: 'error',
                message: 'Account does not exist'
            })
        } else {
            //if user exists check auth
            if (user.authenticated(req.body.password)) {
                //if authenticated sign a token
                const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                    expiresIn: '1d'
                });
                //return it 
                res.status(200).json({
                    type: 'success',
                    user: user.toObject(),
                    token
                })
            } else{
                //if auth fails
                res.json({
                    type: 'error',
                    message: 'Authentication failed'
                })
            }
        }
    })
})
router.post('/me/from/token', (req,res) => {
    //request must contain token
    let token = req.body.token;
    if (!token) {
        //if no token return an error
        res.json({
            type: 'error',
            message: 'You must include a valid token'
        })
    }else {
        //if there is a token verify it
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            //if any errors during verification return an error
            if (err){
                res.json({
                    type: 'error',
                    message: 'You must include a valid token'
                })
            } else {
                //if token is valid use token to look up user in db
                User.findById(user._id, (err, user) => {
                    if (err) {
                        res.json({
                            type: 'error',
                            message: 'Database error during validation'
                        })
                    } else {
                        res.json({
                            type: 'success',
                            user: user.toObject(),
                            token
                        })
                    }
                })
            }
        })
    }

})

module.exports = router