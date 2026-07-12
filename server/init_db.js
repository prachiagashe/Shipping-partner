require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    try {
        // Connect to MySQL server (without specifying database yet)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            multipleStatements: true // Allow multiple SQL statements from the file
        });

        console.log('Connected to MySQL server on port ' + (process.env.DB_PORT || 3306));

        // Read the schema.sql file
        const schemaPath = path.join(__dirname, 'models', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing database schema script...');
        
        // Execute the SQL queries
        await connection.query(schema);

        console.log('Database and tables have been successfully created!');
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initializeDatabase();
