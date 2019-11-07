const mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema ({
    token: String,
}, {
    timestamps: true
})  

module.exports = mongoose.model('Token', tokenSchema)