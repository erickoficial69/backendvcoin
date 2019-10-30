const pool = require('../mysql/mysql') 
const {Router} = require('express') 
const nodemailer = require('nodemailer')
const register = require('./mails')
const {join} = require('path')

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'Pruebasvcointransfer@gmail.com',
        pass: '7878984654'
    }
};
 
var smtpTransport = nodemailer.createTransport(smtpConfig); 

const router = Router()

router.get('/', async (rq, rs)=>{
    rs.json({status:'server is running'})
})




router.post('/loginUser', async (rq, rs)=>{
    const {correo, password} = rq.body
   
    try{
        const success = await pool.query('select * from usuarios where correo = ?', [correo])
        
        if(success[0].password !== password){
            return rs.json('contraseña incorrecta')
        }else if(success[0].userStatus === 'no confirmado'){
            rs.json('usuario no confirmado')
        }else{
            rs.json(success[0])
        }
       return
    }catch(e){
        rs.json('fail')
    }
})
//paises
router.get('/paises', async (rq, rs)=>{
   
    try{
        const pedido = await pool.query('select * from paises  where id != 2')
        rs.json(pedido)
    }catch(e){
        rs.json('error')
    }      
    
})
//pedidos generales
router.get('/pedidosg', async (rq, rs)=>{
   
    try{
        const rsPaises = await pool.query('select * from pedidos limit 10')
         
             rs.json(rsPaises)   
    }
      catch(e){
         console.log(e)
      }       
    
})
//pedido unico
router.post('/pedido', async (rq, rs)=>{
   const correo = rq.body.correo
   
    try{
        const rsPaises = await pool.query('select * from pedidos where correoRemitente = ?',[correo])
         
             rs.json(rsPaises)   
    }
      catch(e){
         console.log(e)
      }       
    
})

//borrar pedido
router.post('/delete', async (rq, rs)=>{
    const id = rq.body.id
    
     try{
         const rsPaises = await pool.query('delete from pedidos where id = ?', [id])
          
              rs.json('borrado exitoso')   
     }
       catch(e){
          console.log(e)
       }       
     
 })

//registe user
router.post('/registerUser', async(rq,rs)=>{
    

    const {nombre,apellido,correo,password, fechaIncripcion,userPaisOrigen,dni} = rq.body
    const newUser ={
        nombre,
        apellido,
        correo,
        password,
        fechaIncripcion,
        token:Date.now(),
        userPaisOrigen,
        userPaisActual:'',
        dni
    }
    var mailOptions = {
        from: 'Pruebasvcointransfer@gmail.com',
        to: `${correo}`, 
        subject:'Corfirmar registro',
        html:`
        <div style="
           background-color: white;
           width: 80%;
           height: 250px;
           position: relative;
           margin: 0 auto;
           text-align: center;
           border: 2px solid #eaeaea;
           border-radius: 15px;
           overflow: hidden
           ">
                <h1 style="
            font-size:30px;
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            font-family: sans-serif;
            color: white;
            background-color: rgb(16, 108, 160);
            padding: 15px 0;
            margin-top: -1px;
            line-height: 2;
            ">¡Bienvenido!</h1>
                <p style="
               color: rgb(122,122,122);
               text-align: left;
               font-size: 16px;
               font-family: sans-serif;
               padding: 0 20px;
               margin-bottom: 50px;
               ">
                    Para contuniar con el registro de tu cuenta en VcoinTransfer verifica este correo usando el boton <strong style="
                color: rgb(16, 108, 160);
                font-family: sans-serif;
                font-size: 14px;
                "> AZUL </strong>de alli abajo
                </p>
                <a style="
                background-color: rgb(16, 108, 160);
              
                height: 45px;
                width: 100px;
                color: white;
                text-decoration: none;
                font-weight: bold;
                font-family: sans-serif;
                text-transform: uppercase;
                padding: 10px 25px; 
                border-radius: 7px;
                        " href="https://backendvcoin.herokuapp.com/confirm/${newUser.token}/${correo}/confirmado">Verificar cuenta</a>
            </div>
        `
    }
    try{
        const regi = await pool.query('insert into usuarios set ?', [newUser])
        rs.send('ok')

        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log('ok')
                }
            });
    }catch(e){
        rs.json(e)
        console.log(e)
    }
})
//confirm new user
router.get('/confirm/:token?/:correo?/:status?', async(rq,rs)=>{
    
    const {correo,status} = rq.params
    try{
        await pool.query('update usuarios set ? where correo =?',[{userStatus:status},correo])
        rs.redirect('https://vcointransfer.erickoficial69.now.sh/')
    }
    catch(err){
        console.log(err)
    }
})

//mail verify
router.post('/mailVerify', async(rq,rs)=>{
    
    const {correo} = rq.body
    
    try{
        const success = await pool.query('select * from usuarios where correo = ?', correo)
        success[0] === undefined ? rs.json('si') : rs.json('no')
        
    }catch(e){
        return rs.json('error')
    }
})

//add bankAcount
router.post('/newBankAcount', async(rq,rs)=>{
    
    const {
        paisBanco,
        banco,
        numeroCuenta,
        tipoCuenta,
        idUsuario,
        titular,
        dniTitular,
        nacional
    } = rq.body
    const datos = {
        paisBanco,
        banco,
        numeroCuenta,
        tipoCuenta,
        idUsuario,
        titular,
        dniTitular,
        nacional
    }

    try{
        await pool.query('insert into cuentasbancarias set ?', [datos])
        
        rs.json({status:'ok'})
        return
    }
    catch(e){
        
        rs.json(e)
    }
})
// get bank unique
router.get('/bankAcounts/:usuario', async(rq,rs)=>{
    
    const idUsuario = rq.params.usuario
console.log(idUsuario)
    try{
        const success = await pool.query('select * from cuentasbancarias where idUsuario = ?', idUsuario)
       
       return rs.json(success)
    }
    catch(e){
        rs.json(e)
    }
})
//borrar banco
router.get('/deletebank/:id?', async (rq, rs)=>{
    const {id} = rq.params
    console.log(rq.params)
     try{
            await pool.query('delete from cuentasbancarias where id = ?', [id])
          
              rs.json('borrado exitoso')   
     }
       catch(e){
          console.log(e)
       }       
     
 })
// get img Paises

router.get('/imgpaises', async (rq, rs)=>{
   
    try{
        const img = await pool.query('select * from imgpaises')
        
        rs.json(img)
    }catch(e){
        console.log(e)
        rs.json('error')
    }      
    
})


// get dataPais

router.get('/datapais/:name?', async (rq, rs)=>{
   const {name} = rq.params
    try{
        const img = await pool.query('select * from imgpaises where nombre =?',name)
        console.log(img[0])
        rs.json(img)
    }catch(e){
        console.log(e)
        rs.json('error')
    }      
    
})
router.get('/test', async(rq,rs)=>{
    
    rs.sendFile(join(__dirname,'./test.js'))
    console.log(__dirname,'./test.js')
})
module.exports = router