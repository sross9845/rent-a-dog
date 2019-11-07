const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
    res.send('You have hit the protected test route')
})

module.exports = router;