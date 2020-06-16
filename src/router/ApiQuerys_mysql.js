const pool = require('../mysql/mysql') 
const {Router} = require('express') 
const pdf = require('html-pdf');
const {resolve} = require('path')
const upload = require('./uploadsRoutes')

const invoice = require('../invoice/invoice') 

const router = Router()

router.get('/', async (rq, rs)=>{
    
    rs.sendFile(resolve('public'))
})

router.post('/createpdf',async (rq,res)=>{
    const pedido = rq.body

        pdf.create(invoice(pedido)).toFile(`./public/pdfs/invoice/${pedido.idPedido}.pdf`, function(err, file) {
            if (err){
                (err.name)
                res.send("error")
                return 
            }
            if (file) {
                res.sendFile(resolve(`./public/pdfs/invoice/${pedido.idPedido}.pdf`))
        }
        });
})
router.get('/getpdf/:id',(rq,res)=>{
        res.sendFile(resolve(`./public/pdfs/invoice/${rq.params.id}.pdf`))
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
        console.log(e)
    }
})
//upload photo
router.post('/upload',upload.single('photo'),(rq,rs)=>{
    
    const name = 'uploads/'+rq.file.filename
    return rs.send(name)
})
// show one user 
router.get('/getUser/:correo',async(rq,rs)=>{
     const {correo} = rq.params
     try{
         const user = await pool.query(`select * from usuarios where concat(nombre,' ',dnir,' ',apellido,' ',correo,' ',idUsuario,' ',rango) like '%${correo}%'`)
         rs.json(user)
     }
    catch(e){
        (e)
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
        console.log(e)
    }
})
router.post('/setStatusUser',async(rq,rs)=>{
    const {userStatus,idUsuario} = rq.body
    try{
        const user = await pool.query(`update usuarios set? where idUsuario=?`,[{userStatus},idUsuario])
        rs.json(user[0])
    }
    catch(e){
        console.log(e)
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
                    dniUsuario:user[0].dni,
                    telefonoUsuario:user[0].telefono
                    }
                    rs.json(dataFinal)
            
    }
      catch(e){
         (e)
      }       
    
})
//rastreador pedido
router.post('/rastrearpedido', async (rq,rs)=>{
    const {idPedido} = rq.body
    try {
        const pedido = await pool.query(`select * from pedidos where idPedido = ${idPedido}`)
        const usuario = await pool.query(`select * from usuarios where idUsuario = ${pedido[0].idUsuario}`)

        const resultado = {
            idPedido:pedido[0].idPedido,
            remitente:usuario[0].nombre+' '+usuario[0].apellido,
            montoDeposito:pedido[0].montoDeposito,
            montoRetiro:pedido[0].montoRetiro,
            monedaDeposito:pedido[0].monedaDeposito,
            monedaRetiro:pedido[0].monedaRetiro,
            status:pedido[0].status
        }
        rs.send(resultado)
    } catch (error) {
        rs.send(error)
        (error)
    }
})
router.post('/updatePhoneNumber', async(rq,rs)=>{
    const newData ={
        telefono:rq.body.numero
    }
    try{
        await pool.query('update usuarios set? where idUsuario =?',[newData,rq.body.id])
        rs.json({update:'ok'})
    }
    catch(err){
        (err)
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
        (err)
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
        (e)
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
        (e)
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
      (success)
       return rs.json(success[0])
    }
    catch(e){
        rs.json(e)
    }
})
// get bank from pedido for country
router.get('/bankAcountCountry/:usuario?/:pais?', async(rq,rs)=>{
    const pais = rq.params.pais
    try{
        const success = await pool.query(`select * from cuentasbancarias where idTitular='1' and paisBanco ='${pais}'`)
       return rs.json(success)
    }
    catch(e){
        (e)
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
          (e)
       }       
     
 })
// get img Paises
router.get('/imgpaises', async (rq, rs)=>{
   
    try{
        const img = await pool.query('select * from imgpaises')
        
        rs.json(img)
    }catch(e){
        (e)
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
        (e)
        rs.json('error')
    }      
    
})
router.post('/savemessage',async(rq,rs)=>{
    try{
        await pool.query('insert into mensajes set?',[rq.body])
        rs.send('mensaje enviado')
    }
    catch(e){
        rs.send(e)
    }
}) 
module.exports = router