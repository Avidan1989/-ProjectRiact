const mysql = require('mysql2');
let connections = {};

const db = {
  getConnection: (dbName) => {
    if (!connections[dbName]) {
      connections[dbName] = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: dbName,
      });

      connections[dbName].connect((err) => {
        if (err) {
          console.error(`Error connecting to database ${dbName}:`, err);
          throw err;
        }
        console.log(`Connected to MySQL database ${dbName}!`);
      });

      connections[dbName].on('error', (err) => {
        console.error(`Database connection error (${dbName}):`, err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          connections[dbName] = null;
        }
      });
    }
    return connections[dbName];
  },
};

module.exports = db;
