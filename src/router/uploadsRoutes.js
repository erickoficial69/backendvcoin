const {extname} = require('path') 
const multer = require('multer')

const storage = multer.diskStorage({
    destination:'public/static/uploads',
    filename(rq,file,cb){
        const archivo = `${Date.now()+extname(file.originalname)}`
        cb(null, archivo)
    }
})

const upload=multer({storage})



module.exports = upload