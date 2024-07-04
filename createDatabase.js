const mysql = require('mysql2/promise');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];

const createDatabase = async () => {
    const { username, password, database, host, port } = config;

    try {
        const connection = await mysql.createConnection({
            host,
            port,
            user: username,
            password
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        console.log(`Database ${database} created or already exists.`);
        await connection.end();
    } catch (error) {
        console.error(`Error creating database: ${error.message}`);
        throw error;
    }
};

module.exports = createDatabase;
