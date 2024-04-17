const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const auth = require('./user.router')

require('dotenv').config()
const db = process.env.NODE_ENV==='DEV' ? 'mongodb://127.0.0.1:27017/auth' : 'mongodb://auth_db:27017/auth'

app.use(express.json())

mongoose
    .connect(db)
    .then(() => console.log(`Mongodb Connected`))
    .catch(error => console.log(error));

app.use('/auth', auth)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
