//import express server with http module
const cors = require('cors') 
const express = require('express') 
const {resolve} = require('path') 
const {exec} = require('child_process') 

const morgan = require('morgan') 

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.set('port', process.env.PORT || 4000)

const io = require('socket.io')

const apiQuerys = require('./router/ApiQuerys_mysql') 
const userServices = require('./router/userServices') 

//router

app.use(apiQuerys)
app.use(userServices)

//static files 
app.use(express.static(resolve('public')))


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
    await socket(ws)/* 
    const limit = 90000
    function borrar(){
        exec(`rm -rf ${resolve('./public/pdfs/invoice/*')}`, (err)=>{
            if(err) return
        })
    }
    setInterval(borrar,limit) */
})()