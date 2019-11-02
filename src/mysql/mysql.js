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
    database:'bve6dsbfjomqknxl1zt3',
    user:'uh0f7khjnicpyoha',
    password:'GRfj2F8gwxOGqNQUirSh',
    host:'bve6dsbfjomqknxl1zt3-mysql.services.clever-cloud.com',
    connectionLimit:1
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