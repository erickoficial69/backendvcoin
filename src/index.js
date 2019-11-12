//import express server with http module
const cors = require('cors') 
const express = require('express') 
const {join, extname} = require('path') 

const morgan = require('morgan') 

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.set('port', process.env.PORT || 4000)

const io = require('socket.io')

const pushEvents = require('./router/push-events') 
const apiQuerys = require('./router/ApiQuerys_mysql') 
const userServices = require('./router/userServices') 
//router
app.use(pushEvents)
app.use(apiQuerys)
app.use(userServices)
//update photo

//static files 
app.use(express.static(join(__dirname, './build/')))


const http = require('http').createServer(app)
//save socket conection
const ws = io(http)
//const sockets functions
const socket = require('./sockets/index_mysql')

const os = require('os').networkInterfaces()

const ip = ()=>{
        for(const net of Object.keys(os)){
            for(const key of os[net]){
                const {family, internal, address} = key
                if(family === 'IPv4' & !internal){
                    return address
                }
            }
        }
}
(async()=>{
    await http.listen(app.get('port'), '0.0.0.0')
    console.log(ip(),'puerto',app.get('port'))
    await socket(ws)
    
})()