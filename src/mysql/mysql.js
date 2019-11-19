const mysql = require('mysql') 
const {promisify} = require('util') 

/*const pool = mysql.createPool({
    database:'vc',
    user:'root',
    password:'',
    host:'localhost',
    connectionLimit:4
})*/

const pool = mysql.createPool({
    database:'sql9312738',
    user:'sql9312738',
    password:'zBATm23uaG',
    host:'sql9.freesqldatabase.com',
    connectionLimit:10
})

pool.getConnection((err, connection)=>{
    if(err){
        console.log(
            err
        )
        return
    }
    if(connection) connection.release();
    console.log('mysql conectado')
})

pool.query = promisify(pool.query); 
 
module.exports = pool