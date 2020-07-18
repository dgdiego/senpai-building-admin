const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port:  3316,
    password: 'root',
    database: 'bulding-admin'
});

connection.connect();

module.exports = connection;
