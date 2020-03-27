const pool = require('../mysql/mysql') 
const {Router} = require('express') 
const nodemailer = require('nodemailer')

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    retuireTLS:true,
    auth: {
        user: 'erickoficial69@gmail.com',
        pass: 'gmail_69'
    }
};
 
var smtpTransport = nodemailer.createTransport(smtpConfig); 

const router = Router()


router.get('/email',(rq,rs)=>{
    var mailOptions = {
        from: 'vcointransfer@gmail.com',
        to: `erickoficial69@gmail.com`, 
        subject:'Recuperacion de contraseña',
        html:"<h1>test</h1>"
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            rs.send('error')
        }else{
            console.log('ok')
            }
        });
})
//registe user
router.post('/registerUser', async(rq,rs)=>{
    

    const {nombre,apellido,correo,password, fechaIncripcion,pais,dni,idOperador,userStatus,telefono} = rq.body
    const newUser ={
        nombre,
        apellido,
        correo,
        password,
        fechaIncripcion,
        token:Date.now(),
        pais,
        dni,
        idOperador,
        userStatus,
        telefono
    }
   
    try{
        const regi = await pool.query('insert into usuarios set ?', [newUser])

         var mailOptions = {
        from: 'vcointransfer@gmail.com',
        to: `${correo}`, 
        subject:'Corfirmar registro',
        html:`
        <div style="
           background-color: white;
           width: 80%;
           position: relative;
           margin: 0 auto;
           text-align: center;
           border: 2px solid #eaeaea;
           border-radius: 15px;
           ">
                <h1 style="
            font-size:22px;
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            font-family: sans-serif;
            color: white;
            background-color: rgb(16, 108, 160);
            padding: 10px 0;
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
                    Para continuar con el registro de tu cuenta en VcoinTransfer verifica este correo usando el boton <strong style="
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
                        " href="https://backendvcoin.herokuapp.com/confirm/${newUser.idOperador}/${correo}/${newUser.token}/confirmado">Verificar cuenta</a>
            </div>
        `
    }

        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log('ok')
                }
            });

            rs.send('ok')
    }catch(e){
        rs.json(e)
        console.log(e)
    }
})
//confirm new user
router.get('/confirm/:idOperador?/:correo?/:token?/:status?', async(rq,rs)=>{
    
    const {correo,status, token} = rq.params
    try{
        await pool.query('update usuarios set ? where token =?',[{userStatus:status},token])
        rs.redirect(`https://vcointransfers.com/Recover/${status}`)
    }
    catch(err){
        console.log(err)
    }
})
//recover pass
router.post('/recoverpass', async(rq,rs)=>{
    

    const {correo}= rq.body
   
    try{
        const user = await pool.query('select token from usuarios where correo =?', [correo])

        var mailOptions = {
            from: 'vcointransfer@gmail.com',
            to: `${correo}`, 
            subject:'Recuperacion de contraseña',
            html:`
            <div style="
               background-color: white;
               width: 80%;
               position: relative;
               margin: 0 auto;
               text-align: center;
               border: 2px solid #eaeaea;
               border-radius: 15px;
               ">
                    <p style="
                   color: rgb(122,122,122);
                   text-align: left;
                   font-size: 16px;
                   font-family: sans-serif;
                   padding: 0 20px;
                   margin-bottom: 50px;
                   ">
                        Para continuar verifica este correo usando el boton <strong style="
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
                            " href="https://vcointransfers.com/UpdatePass/${user[0].token}">Cambiar contraseña</a>
                </div>
            `
        }

        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log('ok')
                }
            });
            rs.send('revise su correo')
    }catch(e){
        rs.json(e)
        console.log(e)
    }
})

//recover pass
router.post('/updatepass', async(rq,rs)=>{
 const {password, token} = rq.body.data

    try{
         await pool.query('update usuarios set ? where token =?',[{password},token])

        rs.send('Recuperacion Exitosa!!')
        
    }catch(e){
        rs.json(e)
        console.log(e)
    }
})
module.exports = router