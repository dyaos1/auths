const { User } = require('./user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const PRIVATE_KEY = process.env.SECRET_KEY;
const SALT = process.env.SALT;

const makeHash = (password) => {
    return crypto
        .createHmac('sha512', Buffer.from(SALT))
        .update(password)
        .digest('base64')
}

const userlist = async () => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'DEV') { return User.find() }
    else { return 'access forbidden' }
}

const register = (user) => {
    const { name, password, password2 } = user;
    if (password !== password2) throw new Error('password does not match.')

    const encryptedPassword = makeHash(password)

    const newUser = new User({
        name: name,
        password: encryptedPassword
    })

    newUser.save()
    return newUser.name
}

const login = async (user) => {
    const { name, password } = user;
    const encryptedPassword = makeHash(password)

    const savedUser = await User.findOne({ name: name }).exec()

    if (!savedUser) throw new Error('There is no user with that name')
    if (savedUser.password !== encryptedPassword ) throw new Error('Password Unmatched')

    const payload = {
        name: name,
        password: password
    }

    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '60s'
    })

    return token
}

const renew = async (token) => {
    try {
        const decoded = jwt.verify(token, PRIVATE_KEY)
        const user = { name: decoded.name, password: decoded.password } 
        const newToken = await login(user)

        return { success: true, token: newToken }
    } catch (e) {
        console.log('error!')

        return { success: false, token: token }
    }
}

module.exports = {
    register, login, renew, userlist
}