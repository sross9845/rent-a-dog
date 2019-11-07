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
        var token = response.data.access_token
        let newToken = Token({
            token: response.data.access_token
    })
    newToken.save((err, token) => {
        res.json(token)
    })
    .catch(err => {
        console.log(err.response)
    })
})



module.exports = router;