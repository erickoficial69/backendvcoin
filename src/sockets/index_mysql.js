const pool = require('../mysql/mysql') 
const nodemailer = require('nodemailer')

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
    let limit = await  data.limit ? data.limit : 20
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
    let limit = await  dataLimit ? dataLimit : 20
    try{
        const pedido = await pool.query(`select pedidos.*, usuarios.*, cuentasbancarias.* from pedidos inner join usuarios on usuarios.idUsuario = pedidos.idUsuario inner join cuentasbancarias on cuentasbancarias.id = pedidos.idBanco order by idPedido desc limit ${limit}`)
        
        ws.emit('pedidosGenerales', pedido)
    }catch(e){
        ws.emit('pedidosGenerales', 'error')
    }
}        
const newOrder = async(pedido)=>{
    const datosPedido = {
        montoDeposito:pedido.montoDeposito,
        monedaDeposito:pedido.monedaDeposito,
        referenciaDeposito:pedido.referenciaDeposito,
        referenciaRetiro:'',
        montoRetiro:pedido.montoRetiro,
        monedaRetiro:pedido.monedaRetiro,
        tazaCambio:pedido.tazaCambio,
        idBanco:pedido.idBanco?pedido.idBanco:'por definir',
        idUsuario:pedido.idUsuario,
        fechaPedido:pedido.fechaPedido,
        fechaCompletada:pedido.fechaCompletada    
      }
        try{
            var mailCliente = {
                from: 'Pruebasvcointransfer@gmail.com',
                to: `${pedido.correoUsuario}`, 
                subject:'Nuevo pedido',
                html: `
                    <div>
                        <h1>Saludos ${pedido.nombreUsuario}</h1>
                        <p>Tu solicitud fue enviada a red Vcoin Transfer</p>
                        <strong>Deposito:</strong>${pedido.montoDeposito} ${pedido.monedaRetiro}
                        <strong>Retiro:</strong>${pedido.montoRetiro} ${pedido.monedaDeposito}
                    </div>
                `
            }
            var mailVcoin = {
                from: 'Pruebasvcointransfer@gmail.com',
                to: `Pruebasvcointransfer@gmail.com`, 
                subject:'Nuevo encargo',
                html: `
                    <div>
                        <h1>Saludos, tienes un nuevo encargo</h1>
                        <p>Cliente: ${pedido.nombreUsuario} ${pedido.correoUsuario}</p>
                        <strong>Deposito:</strong>${pedido.montoDeposito} ${pedido.monedaRetiro}
                        <strong>Retiro:</strong>${pedido.montoRetiro} ${pedido.monedaDeposito}
                    </div>
                `
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
    /*Recibe por parametro
            idPedido,status,nombreUsuario,correoUsuario,idBanco,idUsuario,nombreOperador,correoOperador */
    
    if(data.referenciaDeposito === undefined){

        const datos ={
            idPedido: data.idPedido,
            status:data.status,
            idUsuario: data.idUsuario,
            idOperador: data.idOperador,
            nombreOperador: data.nombreOperador,
            correoOperador:data.correoOperador
    }
    const mensajeToOperador ={
        titulo:`Han habido cambios`,
        body:`El usuario ${data.nombreUsuario} actualizó el pedido: ${data.idPedido} a: ${data.status}`,
        usuario:data.idUsuario,
        operador:data.idOperador
    }

       try{
        var mailCliente = {
            from: 'Pruebasvcointransfer@gmail.com',
            to: `${data.correoUsuario}`, 
            subject:'Nuevo data',
            html: `
                <div>
                    <h1>Saludos ${data.nombreUsuario}</h1>
                    <p>Tu solicitud fue:${data.status} por el operador: ${data.nombreOperador}</p>
                </div>
            `
        }
            await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
            notificacionToOperador(mensajeToOperador)
            pedidosGenerales()
            pedidos_clientes(data)

            smtpTransport.sendMail(mailCliente, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log('ok')
                    }
                });
        }
        catch(e){
            console.log(e)
        }
        return
    }
    
    if(data.referenciaDeposito!==undefined){
        
        /*nuevos parametros 
        idBancoOld,
            statusOld
            montoDeposito,
            monedaDeposito,
            montoRetiro,
            monedaRetiro,
            tazaCambio,
            fechaPedido,
            
            bancoVcoin,
            titularVcoin,
            dniTitularVcoin,
            paisVcoin,
            nacionalVcoin,
            nCuentaVcoin,
            tipoCuentaVcoin  */
        const datos={
            referenciaDeposito:data.referenciaDeposito,
            status:data.status,
            idBanco:data.idBanco
        }
        
        const mensajeToOperador ={
            titulo:`Han habido cambios`,
            body:`El usuario ${data.nombreUsuario} actualizó el pedido: ${data.idPedido} a: ${data.status}`,
            usuario:data.idUsuario,
            operador:data.idOperador
        }
        
           try{
                await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                pedidosGenerales()
                pedidos_clientes(data)
                notificacionToOperador(mensajeToOperador)
                ws.emit('updatePedido','ok')
            }
            catch(e){
                console.log(e)
                ws.emit('updatePedido','hubo un error')
            }
            return
    }
    
    } 
const updatePedidoAdm = async(data)=>{
       /*nuevos parametros 
        idBancoOld,
            statusOld
            montoDeposito,
            monedaDeposito,
            montoRetiro,
            monedaRetiro,
            tazaCambio,
            fechaPedido,
            
            bancoVcoin,
            titularVcoin,
            dniTitularVcoin,
            paisVcoin,
            nacionalVcoin,
            nCuentaVcoin,
            tipoCuentaVcoin  */
        if(data.referenciaRetiro!==undefined){
            
            const datos={
                referenciaRetiro:data.referenciaRetiro,
                status:data.status
            }
            const mensaje ={
                titulo:`${data.nombreUsuario} Pedido actualizado`,
                body:`Pedido id: ${data.idPedido} fue ${data.status} por ${data.nombreOperador}`,
                usuario:data.idUsuario
            }
            const mensajeToOperador ={
                titulo:`Han habido cambios`,
                body:`Se actualizó el pedido: ${data.idPedido} a: ${data.status} para el cliente ${data.nombreUsuario}`,
                usuario:data.idUsuario,
                operador:data.idOperador
            }
               try{
                   
                    await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                    notificacionPedido(mensaje)
                    notificacionToOperador(mensajeToOperador)
                    pedidosGenerales()
                    pedidos_clientes(data)
                    ws.emit('updatePedidoAdm','ok')
                }
                catch(e){
                    console.log(e)
                }
                return
            }

        if(data.referenciaRetiro===undefined){
            console.log(data)
            const datos ={
                idOperador:data.idOperador,
                nombreOperador:data.nombreOperador,
                correoOperador:data.correoOperador,
                status:data.status
            }
            const mensaje ={
                titulo:`${data.nombreUsuario}`,
                body:`Pedido ${data.idPedido} fue ${data.status} por ${datos.nombreOperador}`,
                usuario:data.idUsuario
            }
            try{
                   
                await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                notificacionPedido(mensaje)
                pedidosGenerales()
                pedidos_clientes(data)
            }
            catch(e){
                console.log(e)
            }
        }
        
        } 
const deletePedido = async(data)=>{
     
                 const datos ={
                     status:data.status,
                     mensaje:data.mensaje
                 }
                 const mensaje ={
                     titulo:`${data.nombreUsuario}`,
                     body:data.mensaje,
                     usuario:data.idUsuario
                 }
                 try{
                        
                     await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                     notificacionPedido(mensaje)
                     pedidosGenerales()
                     pedidos_clientes(data)
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
        const mensaje ={
            titulo:`VcoinTransfer dice:`,
            body:`La taza a Variado`,
            usuario:data.idUsuario
        }
        
        try{
            await pool.query('UPDATE paises SET ? WHERE id = ?',[{tazaCambio},id])
            dolarPaises()
            ws.emit('notificacionNoticias',mensaje)
        }
        catch(e){
            console.log(e)
        }
    }
const deletePais = async(data)=>{
    const mensaje ={
        titulo:`VcoinTransfer dice:`,
        body:`Elemendo id: ${data} eliminado`,
        usuario:data.idUsuario
    }
    try{
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
//cierre de funcciones sockets
}