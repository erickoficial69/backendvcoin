const pool = require('../mysql/mysql') 
const nodemailer = require('nodemailer')
const invoicemail = require('../invoice/invoicemail') 
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


module.exports = ws =>{
    //eventos sockets
    ws.on('connection', ws =>{
        ws.on('pedidos',data=>{
            pedidos_clientes(data)
        })
        
        ws.on('pedidosGenerales', dataLimit=>{
            pedidosGenerales(dataLimit)
        })
        ws.on('rqMessage',data=>{
            messages(data)
        })
        ws.on('updateMessage',data=>{
            updateMessage(data)
        })
        dolarPaises()
        dolarVzla()
        ws.on('deleteMessage',data=>{
            deleteMessage(data)
        })
        ws.on('newPedido', pedido =>{
            newOrder(pedido)
        })

        ws.on('newPais', data =>{
            newPais(data)
        })
       
        ws.on('updatePais', data =>{
            updatePais(data)
        })
        ws.on('updatePedidoAdm',data=>{
            updatePedidoAdm(data)
        })
        ws.on('deletePais', data =>{
            deletePais(data)
        })
        ws.on('updatePedido', pedido =>{
            updatePedido(pedido)
        })
        ws.on('deletePedido',data=>{
            deletePedido(data)
        })
        ws.on('newComent',data=>{
            newComent(data)
        })
        ws.on('updateComent',data=>{
            updateComent(data)
        })
        coments()
        comentsAdm()
        //cierre de eventos sockets
    })
//funciones de sockets
const notificacionPedido = async(data)=>{
    ws.emit('notificacionPedido',data)
}
const notificacionToOperador=async(mensajeToOperador)=>{
    ws.emit('notificacionToOperador',mensajeToOperador)
}
const dolarPaises = async ()=>{
    
       try{
           const rsPaises = await pool.query('select * from paises where id != 2')
            
                ws.emit('paises', rsPaises)   
       }
         catch(e){
            console.log(e)
         }    
           
        }

const dolarVzla = async ()=>{

            try{
                const dolarVzla = await pool.query('select * from paises where id = 2')
                
                    ws.emit('dolarVzla', dolarVzla[0])       
            }
            catch(e){
                
                ws.emit('dolarVzla',[
                    {
                        nombre:'hubo un error',
                        codArea:'error',
                        ico:'error'
                    }
                ]) 
            }
    
        }
const pedidos_clientes = async (data)=>{
    let limit = await  data.limit ? data.limit : 31
        try{
            const rsPedidos = await pool.query(`select pedidos.*, usuarios.*, cuentasbancarias.* from pedidos inner join usuarios on usuarios.idUsuario = pedidos.idUsuario inner join cuentasbancarias on cuentasbancarias.id = pedidos.idBanco where pedidos.idUsuario = ${data.idUsuario} order by idPedido desc limit ${limit}`)
            ws.emit(data.idUsuario,rsPedidos)
        }
        catch(e){
           console.log(e)
           ws.emit(data.id,[
                {
                    nombre:'hubo un error',
                    codArea:e,
                    ico:'error'
                }
            ])
        }

    } 
const pedidosGenerales = async(dataLimit)=>{
    let limit = await  dataLimit ? dataLimit : 31
    try{
        const pedido = await pool.query(`select pedidos.*, usuarios.*, cuentasbancarias.* from pedidos inner join usuarios on usuarios.idUsuario = pedidos.idUsuario inner join cuentasbancarias on cuentasbancarias.id = pedidos.idBanco order by idPedido desc limit ${limit}`)
        
        ws.emit('pedidosGenerales', pedido)
    }catch(e){
        ws.emit('pedidosGenerales', 'error')
    }
}        
const newOrder = async(pedido)=>{
    
        try{
            
            const usuario = await pool.query(`select idOperador,nombre,correo from usuarios where idUsuario = ${pedido.idUsuario}`)
            const dataOperador = await pool.query(`select nombre,correo from usuarios where idUsuario = ${usuario[0].idOperador}`)

            const datosPedido = {
                montoDeposito:pedido.montoDeposito,
                monedaDeposito:pedido.monedaDeposito,
                referenciaDeposito:pedido.referenciaDeposito,
                referenciaRetiro:'',
                montoRetiro:pedido.montoRetiro,
                monedaRetiro:pedido.monedaRetiro,
                tazaCambio:pedido.tazaCambio,
                idBanco:pedido.idBanco?pedido.idBanco:0,
                idUsuario:pedido.idUsuario,
                fechaPedido:pedido.fechaPedido,
                fechaCompletada:pedido.fechaCompletada,
                idOperador:usuario[0].idOperador,
                nombreOperador:dataOperador[0].nombre,
                correoOperador:dataOperador[0].correo,
                mensaje:''    
              }
              var mailCliente = {
                from: 'Pruebasvcointransfer@gmail.com',
                to: `${usuario[0].correo}`, 
                subject:'Nuevo pedido',
                html:invoicemail(datosPedido)
            }
            var mailVcoin = {
                from: 'Pruebasvcointransfer@gmail.com',
                to: `Pruebasvcointransfer@gmail.com`, 
                subject:'Nuevo encargo',
                html:invoicemail(datosPedido)
            }
            await pool.query('insert into pedidos set ?', [datosPedido])
            pedidos_clientes(pedido)
            ws.emit('newPedido','Tienes un nuevo encargo')
            pedidosGenerales()

            smtpTransport.sendMail(mailCliente, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log('ok')
                }
            });

            smtpTransport.sendMail(mailVcoin, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log('ok')
                    }
                });
        }
        catch(e){
            console.log(e)
            ws.emit('newPedido','hubo un error')
        }
    }

const updatePedido = async(data)=>{
        
    try{
        const cliente = await pool.query(`select nombre,apellido,correo,rango from usuarios where idUsuario = ${data.idUsuario}`)

       const mensajeToOperador ={
        titulo:`Han habido cambios`,
        body:`El usuario${cliente[0].nombre}  ${cliente[0].apellido} actualizó el pedido: ${data.idPedido} a: ${data.status}`,
        operador:data.idOperador
    }
       const datos ={
        status:data.status,
        referenciaDeposito:data.referenciaDeposito,
        idBanco:data.idBanco
    }
        await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
        ws.emit('updatePedido','ok')
        notificacionToOperador(mensajeToOperador)
        pedidosGenerales()
        pedidos_clientes(data)
    }
        catch(e){
            console.log(e)
        }
    } 
const updatePedidoAdm = async(data)=>{

            try{
                const pedido = await pool.query(`select * from pedidos where idPedido= ${data.idPedido}`)

                const cliente = await pool.query(`select nombre,apellido,correo,rango from usuarios where idUsuario = ${pedido[0].idUsuario}`)

                const operador = await pool.query(`select nombre,apellido,rango from usuarios where idUsuario = ${pedido[0].idOperador}`)

                const mensaje ={
                   titulo:`${cliente[0].nombre}  ${cliente[0].apellido}`,
                   body:`pedido aprobado por ${pedido[0].nombreOperador}`,
                   usuario:pedido[0].idUsuario
               } 
               const mensajeToOperador ={
                titulo:`Han habido cambios`,
                body:`El pedido: ${data.idPedido} se actualizó a: ${data.status}`,
                operador:pedido[0].idOperador
            }
               const datos ={
                status:data.status,
                referenciaDeposito:pedido[0].referenciaDeposito,
                referenciaRetiro:data.referenciaRetiro
            }
                await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                notificacionPedido(mensaje)
                notificacionToOperador(mensajeToOperador)
                pedidosGenerales()
                pedidos_clientes(pedido[0])
                ws.emit('updatePedidoAdm','ok')
            }
            catch(e){
                console.log(e)
            }
        
    } 
const deletePedido = async(data)=>{
     
                 const datos ={
                     status:data.status,
                     mensaje:data.mensaje
                 }
                 
                 try{
                     const pedido = await pool.query(`select idOperador,idUsuario,correoOperador,nombreOperador from pedidos where idPedido= ${data.idPedido}`)

                     const cliente = await pool.query(`select nombre,apellido,correo from usuarios where idUsuario = ${pedido[0].idUsuario}`)

                     const operador = await pool.query(`select nombre,apellido from usuarios where idUsuario = ${pedido[0].idUsuario}`)

                     const mensaje ={
                        titulo:`${cliente[0].nombre}  ${cliente[0].apellido}`,
                        body:data.mensaje,
                        usuario:pedido[0].idUsuario
                    } 
                    const mensajeToOperador ={
                        titulo:`Han habido cambios`,
                        body:data.mensaje,
                        usuario:pedido[0].idUsuario,
                        operador:pedido[0].idUsuario
                    }
                     await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                     notificacionPedido(mensaje)
                     notificacionToOperador(mensajeToOperador)
                     pedidosGenerales()
                     pedidos_clientes(pedido[0])
                     ws.emit('deletePedido','cancelada')
                 }
                 catch(e){
                     console.log(e)
                 }
        }           
const newPais = async(data)=>{
    const mensaje ={
        titulo:`VcoinTransfer dice:`,
        body:`La moneda ya existe`,
        usuario:data.idUsuario
    }
    try{
        const verifyPais = await pool.query(`select * from paises where nombre = ?`,data.nombre)
        
        if(verifyPais[0]===undefined){
            const mensaje ={
                titulo:`VcoinTransfer dice:`,
                body:`Operaciones en ${data.moneda} agregada`,
                usuario:data.idUsuario
            }
            try{
                await pool.query(`insert into paises set ?`, [data])
                dolarPaises()
                ws.emit('notificacionNoticias',mensaje)
                ws.emit('newPais','ok')
            }
            catch(e){
                const mensaje ={
                    titulo:`VcoinTransfer dice:`,
                    body:`Hubo un error agregando la moneda`,
                    usuario:data.idUsuario
                }
                ws.emit('notificacionNoticias',mensaje)
            }
        }else{
            const mensaje ={
                titulo:`VcoinTransfer dice:`,
                body:`La moneda ya existe`,
                usuario:data.idUsuario
            }
            ws.emit('notificacionNoticias',mensaje)
        }
        
    }
    catch(e){
        console.log('estoy vacio')
    }
}
const updatePais = async(data)=>{
        const {id,tazaCambio} = data
        try{
            const pais = await pool.query('select * from paises WHERE id = ?',[id])
            
            const mensaje ={
                        titulo:`VcoinTransfer dice:`,
                        body:`La taza a Variado en ${pais[0].moneda}`
                    }

            await pool.query('UPDATE paises SET ? WHERE id = ?',[{tazaCambio},id])
            dolarPaises()
            ws.emit('updatePais','ok')
            ws.emit('notificacionNoticias',mensaje)
        }
        catch(e){
            console.log(e)
        }
    }
const deletePais = async(data)=>{
    try{ 
        const pais = await pool.query('select * from paises WHERE id = ?',[data])
        const mensaje ={
            titulo:`VcoinTransfer dice:`,
            body:`Se eliminó ${pais[0].moneda}`
        }

        await pool.query(`delete from paises where id = ${data}`)
        dolarPaises()
        
        ws.emit('deletePais',mensaje)
    }
   catch(e){
        ws.emit('deletePais',data)
   }
}

const messages = async (data)=>{
    console.log(data)
    try{
        const message = await pool.query(`select * from mensajes where idDestinatario='${data.idUsuario}' order by id desc`)
        ws.emit(data.correo,message)
    }
    catch(e){
        ws.emit('messages',e)
    }
}

const updateMessage = async (data)=>{
    const status ={
        mensajeStatus:data.mensajeStatus
    }
    try{
        await pool.query('update mensajes set? where idDestinatario =?',[status,data.idUsuario])
        messages(data)
    }
    catch(e){
        ws.emit('messages',e)
    }
}
const deleteMessage = async (data)=>{
    try{
        await pool.query('delete from mensajes where idDestinatario =?',[data.idUsuario])
        messages(data)
    }
    catch(e){
        ws.emit('messages',e)
    }
}
const newComent = async(data)=>{
    try{
        await pool.query(`insert into resenas set ?`,[data])
        ws.emit('newComent','reseña exitosa')
        coments()
        comentsAdm()
    }
    catch(e){
        ws.emit('newComent','error')
    }
    
}
const coments = async()=>{
    try{
        const coments = await pool.query(`select * from resenas order by id desc limit 4`)
        const usuarios = await pool.query(`select foto,nombre from usuarios where idUsuario = ${coments[0].idRemitente}`)
        const comentarios = coments.map(items=>{
            return{
                id:items.id,
                resena:items.mensaje,
                usuario:usuarios[0].nombre,
                foto:usuarios[0].foto,
                status:items.statusResena
            }
        })
        ws.emit('coments',comentarios)
    }
    catch(e){
        console.log(e)
        ws.emit('coments',[{status:0}])
    }
    
}
const comentsAdm = async()=>{
    try{
        const coments = await pool.query(`select * from resenas order by id desc`)
        const usuarios = await pool.query(`select foto,nombre from usuarios where idUsuario = ${coments[0].idRemitente}`)
        const comentarios = coments.map(items=>{
            return{
                id:items.id,
                resena:items.mensaje,
                usuario:usuarios[0].nombre,
                foto:usuarios[0].foto,
                status:items.statusResena
            }
        })
        ws.emit('comentsAdm',comentarios)
    }
    catch(e){
        console.log(e)
        ws.emit('coments',[{status:0}])
    }
    
}
const updateComent = async(data)=>{
    const statusResena = data.accion
    if(data.accion === 'rechazar'){
        try{
            await pool.query(`delete from resenas where id =?`,[data.id])
            coments()
            comentsAdm()
            ws.emit('updateComent','borrada')
        }
        catch(e){
            console.log(e)
            ws.emit('coments','error')
        }
       
    }
    if(data.accion === 'aprobar'){
        
        try{
            await pool.query(`update resenas set ? where id =?`,[{statusResena},data.id])
            coments()
            comentsAdm()
            ws.emit('updateComent','actualizada')
        }
        catch(e){
            console.log(e)
            ws.emit('coments','error')
        }
    }
    
}
//cierre de funcciones sockets
}