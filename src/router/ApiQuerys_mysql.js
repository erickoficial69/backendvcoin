const pool = require('../mysql/mysql') 
const {Router} = require('express') 
const nodemailer = require('nodemailer')
const pdf = require('html-pdf');
const {join} = require('path')

const invoice = require('../invoice/invoice') 



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
    
    rs.send('ok')
})

router.post('/createpdf',async (rq,res)=>{
    const pedido = rq.body
    
    pdf.create(invoice(pedido)).toFile(join(__dirname,`../invoice/invoice_${pedido.idPedido}.pdf`), (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send('ok');
    });
})

router.get('/getpdf/:idPedido',async (rq,rs)=>{
    const {idPedido} = rq.params
    rs.sendFile(join(__dirname,`../invoice/invoice_${idPedido}.pdf`))
})
router.post('/loginUser', async (rq, rs)=>{
    const {correo, password} = rq.body
   
    try{
        const success = await pool.query('select * from usuarios where correo = ?', [correo])
        
        if(success[0].password !== password){
            rs.json('contraseña incorrecta')
            return 
        }

        if(success[0].userStatus === 'no confirmado'){
            rs.json('usuario no confirmado')
            return 
        }

        if(success[0].userStatus === 'suspendido'){
            rs.json('usuario suspendido')
            return 
        }
        rs.json(success[0])
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
//show all users 
router.get('/getUsers',async(rq,rs)=>{
    try{
        const users = await pool.query('select * from usuarios')
        rs.json(users)
    }
    catch(e){
        console.log()
    }
})

// show one user 
router.get('/getUser/:correo',async(rq,rs)=>{
     const {correo} = rq.params
     try{
         const user = await pool.query(`select * from usuarios where concat(nombre,' ',dnir,' ',apellido,' ',correo,' ',idUsuario,' ',rango) like '%${correo}%'`)
         rs.json(user)
     }
    catch(e){
        console.log(e)
     }
 })
 
router.get('/getOneUser/:id',async(rq,rs)=>{
    const {id} = rq.params
    try{
        const user = await pool.query(`select * from usuarios where idUsuario = ${id}`)
        rs.json(user[0])
    }
    catch(e){
        console.log(e)
    }
})
router.post('/upgradeUser',async(rq,rs)=>{
    const {rango,idUsuario} = rq.body
    try{
        const user = await pool.query(`update usuarios set? where idUsuario=?`,[{rango},idUsuario])
        rs.json(user[0])
    }
    catch(e){
        console.log()
    }
})
router.post('/setStatusUser',async(rq,rs)=>{
    const {userStatus,idUsuario} = rq.body
    try{
        const user = await pool.query(`update usuarios set? where idUsuario=?`,[{userStatus},idUsuario])
        rs.json(user[0])
    }
    catch(e){
        console.log()
    }
})
//pedido unico
router.post('/pedido', async (rq, rs)=>{
   const id = rq.body.id
   
    try{
        const data1 = await pool.query('select * from pedidos where idPedido = ?',[id])
        const data2 = await pool.query('select * from cuentasbancarias where id = ?',[data1[0].idBanco])
            
        const user = await pool.query('select * from usuarios where idUsuario = ?',[data1[0].idUsuario])
                const dataFinal= {
                    idPedido: data1[0].idPedido,
                    montoDeposito: data1[0].montoDeposito,
                    monedaDeposito: data1[0].monedaDeposito,
                    montoRetiro: data1[0].montoRetiro,
                    monedaRetiro: data1[0].monedaRetiro,
                    tazaCambio: data1[0].tazaCambio,
                    status: data1[0].status,
                    fechaPedido: data1[0].fechaPedido,
                    idUsuario: data1[0].idUsuario,
                    idBanco: data1[0].idBanco,
                    idOperador:data1[0].idOperador,
                    nombreOperador: data1[0].nombreOperador,
                    correoOperador: data1[0].correoOperador,
                    referenciaDeposito: data1[0].referenciaDeposito,
                    referenciaRetiro: data1[0].referenciaRetiro,
                    fechaCompletada: data1[0].fechaCompletada,
                    bancoVcoin:data2[0].banco?data2[0].banco:'',
                    titularVcoin:data2[0].titular,
                    dniTitularVcoin:data2[0].dniTitular,
                    paisVcoin:data2[0].paisBanco,
                    nacionalVcoin:data2[0].nacional,
                    nCuentaVcoin:data2[0].numeroCuenta,
                    tipoCuentaVcoin:data2[0].tipoCuenta,
                    nombreUsuario:user[0].nombre+' '+user[0].apellido,
                    correoUsuario:user[0].correo,
                    dniUsuario:user[0].dni
                    }
                    rs.json(dataFinal)
            
    }
      catch(e){
         console.log(e)
      }       
    
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
                        " href="https://backendvcoin.herokuapp.com/confirm/${newUser.idOperador}/${correo}/${newUser.token}/confirmado">Verificar cuenta</a>
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
router.get('/confirm/:idOperador?/:correo?/:token?/:status?', async(rq,rs)=>{
    
    const {correo,status} = rq.params
    try{
        await pool.query('update usuarios set ? where correo =?',[{userStatus:status},correo])
        rs.redirect(`http://localhost:3000/Recover/${newUser.idOperador}/${correo}/${newUser.token}`)
    }
    catch(err){
        console.log(err)
    }
})
//get Phone
router.post('/phoneNumberByUser/', async(rq,rs)=>{
    try{
        const phone = await pool.query('select * from telefonos',[rq.body])
        rs.json(phone)
    }
    catch(err){
        console.log(err)
    }
})

router.post('/updatePhoneNumber', async(rq,rs)=>{
    const newData ={
        numero:rq.body.numero
    }
    try{
        await pool.query('update telefonos set? where id =?',[newData,rq.body.id])
        rs.json({update:'ok'})
    }
    catch(err){
        console.log(err)
    }
})
//update profile
router.post('/updateProfile', async(rq,rs)=>{
    const newData ={
        nombre:rq.body.nombre,
        apellido:rq.body.apellido,
        password:rq.body.password,
    }
    try{
        await pool.query('update usuarios set? where idUsuario =?',[newData,rq.body.idUsuario])
        rs.json({update:'ok'})
    }
    catch(err){
        console.log(err)
    }
})
router.post('/updatePhoto', async (rq,rs)=>{
    const foto ={
        foto:rq.body.foto
    }
    try{
        await pool.query(`update usuarios set ? where idUsuario =?`,[foto,rq.body.idUsuario])
        rs.send('ok')
    }
    catch(e){
        console.log(e)
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
        idTitular:idUsuario,
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
        console.log(e)
    }
})
// get bank unique
router.get('/bankAcounts/:usuario?', async(rq,rs)=>{
    
    const idUsuario = rq.params.usuario

    try{
        const success = await pool.query('select * from cuentasbancarias where idTitular = ?', idUsuario)
      
       return rs.json(success)
    }
    catch(e){
        rs.json(e)
    }
})
// get bank unique by id
router.get('/bank/:id?', async(rq,rs)=>{
    
    const id = rq.params.id

    try{
        const success = await pool.query('select * from cuentasbancarias where id =?', id)
      console.log(success)
       return rs.json(success[0])
    }
    catch(e){
        rs.json(e)
    }
})
// get bank from pedido for country
router.get('/bankAcountCountry/:usuario?/:pais?', async(rq,rs)=>{
    
    const idUsuario = rq.params.usuario
    const pais = rq.params.pais
    try{
        const success = await pool.query(`select * from cuentasbancarias where idTitular='1' and paisBanco ='${pais}'`)
       return rs.json(success)
    }
    catch(e){
        console.log(e)
        rs.json(e)
    }
})
//delete bank acount
router.get('/deletebank/:id?', async (rq, rs)=>{
    const {id} = rq.params
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
        rs.json(img)
    }catch(e){
        console.log(e)
        rs.json('error')
    }      
    
})

router.post('/savemessage',async(rq,rs)=>{
    try{
        await pool.query('insert into mensajes set?',[rq.body])
        rs.send('mensaje enviado')
    }
    catch(e){
        rs.send('error')
    }
})
module.exports = router