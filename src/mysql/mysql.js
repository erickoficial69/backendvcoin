const mysql = require('mysql') 
const {promisify} = require('util') 
const credentials = {
    uri: process.env.MYSQL_URI || 'localhost',
    pass: process.env.MYSQL_PASS || '',
    user: process.env.MYSQL_USER || 'root',
    db: process.env.MYSQL_DB || 'vc'
}

const pool = mysql.createPool({
    database: credentials.db,
    user: credentials.user,
    password: credentials.pass,
    host: credentials.uri,
    connectionLimit:10
})

pool.getConnection((err, connection)=>{
    if(err){
        console.error(
            `${err.sqlMessage} code: ${err.code} error number: ${err.errno}`
        )
        return
    }
    if(connection) connection.release();
    console.log('mysql conectado')
})

pool.query = promisify(pool.query); 
 
module.exports = pool