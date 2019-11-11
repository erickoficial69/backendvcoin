import {Router} from 'express' 
const {join, extname} = require('path') 
const route = Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination:join(__dirname,'/uploads'),
    filename(rq,file,cb){
        const archivo = `${Date.now()+extname(file.originalname)}`
        cb(null, archivo)
    }
})

const upload=multer({storage})


module.exports = route