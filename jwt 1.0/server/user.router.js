const express = require('express')
const router = express.Router()
const {register, login, renew, userlist } = require('./user.service')

router.post('/register', async (req, res) => {
  try {
    const newUser = register(req.body)
    res.send(newUser)
  } catch(e) {
    console.error(e)
    res.send('error!')
  }  
})

router.post('/login', async (req, res) => {
    try {
      const token = await login(req.body)

      res.send(token)
    } catch(e) {
      console.error(e)
      res.send('error!')
    }
  })

router.get('/renew', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const newToken = await renew(token)
    console.log(newToken)
    res.send(newToken)
})

router.get('/', async (req, res) => {
  const users = await userlist()

  res.send(users)
})

module.exports = router
