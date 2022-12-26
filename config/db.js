const mysql = require('mysql');
require('dotenv').config();

// Set up the MySQL connection
const con = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.DATABASEUSERNAME,
    password: "",
    database: process.env.DATABASENAME
});

// let query = `CREATE TABLE details sno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL,message TEXT, file_path varCHAR(255)`
let tableName = process.env.TABLENAME;
let query = `CREATE TABLE ${tableName} (sno INT PRIMARY KEY AUTO_INCREMENT,id VARCHAR(255) NOT NULL , name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, message TEXT NOT NULL, file_path VARCHAR(255) NOT NULL) ;`
let checkTableCreate = `SHOW TABLES LIKE '${tableName}'`

const connectToMysql = () => {
    try {
        con.connect(function (err) {
            if (err) {
                throw err;
            };
            console.log('Connected to MySql server');
        })

        con.query(checkTableCreate, (err, rows) => {
            if (err) throw err;
            if (rows.length === 0) {
                con.query(query, (err, rows) => {
                    if (err) throw err;
                    console.log(rows)
                })
            }
        });

    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToMysql;
// module.exports = con