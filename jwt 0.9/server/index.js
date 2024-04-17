const express = require('express')
const app = express()
const PORT = 3001

const { register, login, verify } = require('./auth.jwt')

const main = async () => {
    const conn = await require('./db.connector').init()

    app.use(express.json())

    app.get('/', (req, res) => {
        res.send('hello world')
    })
    
    app.post('/register', async (req, res) => {
        try {
            const payload = req.body
            const result = await register(conn, req.body)
            res.send(result)
        } catch(e) {
            console.log(e)
        }
    })
    
    app.get('/list', async (req, res) => {
        try{
            const [results, fields] = await conn.query('SELECT * FROM user')
            console.log(results);
            console.log(fields);
            res.send(results)
        } catch(e) {
            console.log(e)
        }
    })

    app.post('/login', async (req, res) => {
        try{
            const result = await login(conn, req.body)
            res.send(result)
        } catch(e) {
            console.log(e)
        }
    })

    app.get('/verify', async (req, res) => {
        let token = req.headers['token'];
        try{
            const result = await verify(token);
            res.send(result)
        } catch(e) {
            console.log(e)
        }
    })
    
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
}

main()