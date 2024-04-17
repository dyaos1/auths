const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const PRIVATE_KEY = process.env.SECRET_KEY;
const SALT = process.env.SALT;


async function register(conn, user) {
    const { name, password } = user;

    // 암호화
    const salt = process.env.SALT;
    const encrypted = crypto.createHmac('sha512', Buffer.from(salt)).update(password).digest('base64')
    console.log(encrypted)

    try {
        await conn.query('INSERT INTO user (name, password) VALUES(?, ?)', [name, encrypted])
        return true
    } catch(e) {
        console.log(e)

        return false
    }
}


async function login(conn, user) {
    const [results, fields] = await conn.query('SELECT * FROM user WHERE name = ?', [user.name]);
    const result = results[0]
    console.log(result)

    // 암호화
    const encrypted = crypto.createHmac('sha512', Buffer.from(SALT)).update(user.password).digest('base64')
    console.log(encrypted)

    if(result.password !== encrypted) {
        return 'failed'
    } 
    
    // jwt token publish
    const payload = {
        id: result.id,
        user: result.name,
    }

    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '100s'
    })

    console.log(token)

    return token;
}

async function verify(token) {
    try{
        let payload = jwt.verify(token, PRIVATE_KEY)
		console.log('토큰 인증 성공', payload)
        return true;
    } catch(e) {
		console.log("인증 오류");
        return false;
    }
}

module.exports = {
    register,
    login, 
    verify
}

