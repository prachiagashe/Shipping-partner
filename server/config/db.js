const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' }); // Make sure it can find .env

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'shipping_partner_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
pool.getConnection()
    .then(connection => {
        console.log('MySQL Connected successfully (async mode)');
        connection.release();
    })
    .catch(err => {
        console.log('MySQL Connection Error:', err);
    });

module.exports = pool;
