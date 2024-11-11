const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your database username
    password: 'tanvi@835', // replace with your database password
    database: 'user_db' // replace with your database name
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

module.exports = connection;
