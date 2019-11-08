const express = require('express');
const router = express.Router();
const Token = require('../models/token');
const axios = require('axios');

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

router.get('/:id', (req, res) => {
        Token.findById(req.params.id, (err, token) => {
            console.log(`token ${req.params.id}`)
            axios.get('https://api.petfinder.com/v2/animals', {headers: {
            Authorization: `Bearer ${token.token}`
        }}).then(response => {
            console.log(`------------------------------- in the post token stage`)
            res.send(response.data)
        })
        })
    })

router.get('/:tid/:did', (req, res) => {
    Token.findById(req.params.tid, (err, token) => {
        console.log(req.prarams.tid, req.params.did)
        axios.get(`https://api.petfinder.com/v2/animals/${req.params.did}`, {headers: {
            Authorization: `Bearer ${token}`
        }}).then(reponse => {
            console.log(`------------------------------- in the post token stage`)
            res.send(response.data)
        })
    })
})    



module.exports = router;