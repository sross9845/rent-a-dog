const express = require('express');
const router = express.Router();
const Token = require('../models/token');
const axios = require('axios');

    // Route to /tokens/ --> get s the token and sends it into the token database
    router.get('/', (req, res) => {
        let config = {
            grant_type: process.env.GRANT_TYPE,
            client_id: process.env.PETFINDER_API_KEY,
            client_secret: process.env.PETFINDER_SECRET,
            bearer: '',
        }
        axios.post('https://api.petfinder.com/v2/oauth2/token', config)
            .then(response => {
                let newToken = Token({
                    token: response.data.access_token
            })
                newToken.save((err, token) => {
                    res.send(token)
                })
            })
            .catch(err => {
                console.log(err.response)
            })
        })

    // Route to /tokens/TokenId --> grabs all the animals
    router.get('/:id', (req, res) => {
        Token.findById(req.params.id, (err, token) => {
            axios.get('https://api.petfinder.com/v2/animals', {headers: {
            Authorization: `Bearer ${token.token}`
            }}).then(response => {
                res.send(response.data)
            })
        })
    })

    // Route to /tokens/tokenID/DogID --> grabs specific dog by dogs id in api
    router.get('/:tid/:did', (req, res) => {
        Token.findById(req.params.tid, (err, token) => {
            axios.get(`https://api.petfinder.com/v2/animals/${req.params.did}`, {headers: {
                Authorization: `Bearer ${token.token}`
            }}).then(response => {
                res.send(response.data)
            })
        })
    })    



module.exports = router;