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
    ws.on('connection', ws =>{
        ws.on('pedidos',data=>{
            pedidos_clientes(data)
        })
        
        ws.on('pedidosGenerales', dataLimit=>{
            pedidosGenerales(dataLimit)
        })
        

        dolarPaises()
        dolarVzla()
        
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
    })


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
            const rows = rsPedidos.map((items,i)=>{return i})
            
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
    let limit = await  dataLimit ? dataLimit : 10
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
        montoRetiro:pedido.montoRetiro,
        monedaRetiro:pedido.monedaRetiro,
        tazaCambio:pedido.tazaCambio,
        idBanco:pedido.idBanco,
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
    
    if(data.referenciaDeposito === undefined && data.referenciaRetiro === undefined){
        const datos ={
        idOperador:data.idOperador,
        nombreOperador:data.nombreOperador,
        correoOperador:data.correoOperador,
        status:data.status
    }
    
    const mensaje ={
        titulo:`${data.nombreUsuario} Pedido actualizado`,
        body:`Pedido id: ${data.idPedido} Status actualizado: ${data.status}`,
        usuario:data.idUsuario
    }
    
       try{
        var mailCliente = {
            from: 'Pruebasvcointransfer@gmail.com',
            to: `${data.correoUsuario}`, 
            subject:'Nuevo data',
            html: `
                <div>
                    <h1>Saludos ${data.nombreUsuario}</h1>
                    <p>Tu solicitud fue:${data.status} por: ${data.nombreOperador}</p>
                </div>
            `
        }
            await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
            ws.emit('notificacionPedido',mensaje)
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
    }
    
    if(data.referenciaDeposito!==undefined){
        const datos={
            referenciaDeposito:data.referenciaDeposito,
            status:data.status
        }
        const mensaje ={
            titulo:`${data.nombreUsuario} Pedido actualizado`,
            body:`Pedido id: ${data.idPedido} status: ${data.status}`,
            usuario:data.idUsuario
        }
        
           try{
               
                await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                ws.emit('updatePedido',data.status)
                ws.emit('notificacionPedido',mensaje)
                pedidosGenerales()
                pedidos_clientes(data)
                
            }
            catch(e){
                console.log(e)
                ws.emit('updatePedido','hubo un error')
            }
            return
    }
    if(data.referenciaRetiro!==undefined){
        const datos={
            referenciaDeposito:data.referenciaDeposito,
            status:data.status
        }
        const mensaje ={
            titulo:`${data.nombreUsuario} Pedido actualizado`,
            body:`Pedido id: ${data.idPedido} status: ${data.status}`,
            usuario:data.idUsuario
        }
        
           try{
               
                await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                
                ws.emit('notificacionPedido',mensaje)
                pedidosGenerales()
                pedidos_clientes(data)
                
            }
            catch(e){
                console.log(e)
                ws.emit('updatePedido','hubo un error')
            }
    }
    
    } 
const updatePedidoAdm = async(data)=>{
       console.log(data)
        if(data.referenciaRetiro!==undefined){
            
            const datos={
                referenciaRetiro:data.referenciaRetiro,
                status:data.status
            }
            const mensaje ={
                titulo:`${data.nombreUsuario} Pedido actualizado`,
                body:`Pedido id: ${data.idPedido} status: ${data.status}`,
                usuario:data.idUsuario
            }
            
               try{
                   
                    const re = await pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos,data.idPedido])
                    
                    ws.emit('updatePedidoAdm',data.status)
                    ws.emit('notificacionPedido',mensaje)
                    pedidosGenerales()
                    pedidos_clientes(data)
                    
                }
                catch(e){
                    console.log(e)
                    ws.emit('updatePedido','hubo un error')
                }
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
        console.log(verifyPais)
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
}