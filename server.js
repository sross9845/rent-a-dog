require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const expressJWT = require('express-jwt')
const helmet = require('helmet')

const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(helmet())

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.once('open', () => {
    console.log(`connected to MongoDb on ${db.host}:${db.port}...`)
})
db.on('error', (err) => {
    console.log(`Database Error:\n ${err}`)
})

app.use('/auth', require('./routes/auth'))
app.use('/token', require('./routes/token'))
app.use('/favourite', require('./routes/favorite'))
app.use('/meet', require('./routes/meet'))
app.use('/counter', require('./routes/counter'))

app.use('/locked',
    expressJWT({secret: process.env.JWT_SECRET}).unless({method: 'POST'}),
    require('./routes/locked'))

app.listen(process.env.PORT, () => {
    console.log(`you are listening to the sweet sounds of port ${process.env.PORT}`)
})