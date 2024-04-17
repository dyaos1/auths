const mysql      = require('mysql2/promise');
require('dotenv').config();

const db_config = {
  host     : 'localhost',
  port     : '3310',
  user     : 'root',
  password : '1234',
  database : 'auth'
}

module.exports = {
    init: async function() {
        return await mysql.createConnection(db_config)
    }
}