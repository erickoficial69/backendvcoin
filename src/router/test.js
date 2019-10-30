import React, {Fragment, useState, useEffect} from'react'
import {Link} from 'react-router-dom'
import {updatePedido,pedidos} from '../../gets_apis/sockets'
import palometa from '../../svg/palometa.svg'
import detalles from '../../svg/detalles.svg'
import cerrarDetalles from '../../svg/cerrar.svg'
import advertencia from '../../svg/advertencia.svg'
import enviado from '../../svg/enviado.svg'


const PedidosCliente = (props)=>{
    
        const {typeUser} = props
        const [tabla, setTabla] = useState([{}])
        const [limit, setLimit] = useState(20)
        const [loading,setLoading] = useState('cargando')

        const redi = async ()=>{
            const gets = await fetch('http://localhost:4000/test/erick')
            const resp = await gets.json()
        }

       const getUpdate = e =>{
            
            if(e.target.attributes.status.textContent === 'cancelada'){
                const confirm = window.confirm(`Actualiza a: ${e.target.attributes.status.textContent}`)

                if(confirm === true){
                    updatePedido(e.target.attributes)
                }else{
                    return
                }
                return
            }
            return
        }

       const show = e =>{
           e.target.classList.toggle('detalles')
       }

        useEffect(()=>{
                pedidos(typeUser.idUsuario,setTabla,limit,setLoading)
                
        },[limit])
 return(
        <Fragment>  
                <h1>Ultimos pedidos</h1>
                <section class="table">
            <div class="thead">
                <h2 class="IDth">ID</h2>
                <h2 class="Fechath">Fecha</h2>
                <h2>Monto</h2>
                <h2>Destino</h2>
                <h2>Detalles</h2>
            </div>
            <div class="tbody">
                    {
                        loading==='cargando'?loading:
                        
                        tabla.map((items,i)=>{ return items.status === 'abierta' || items.status === 'aceptada' || items.status === 'verificada' ?(
                            <span key={i} class="tr">
                                    <div class="td IDtr">
                                        {items.idPedido}
                                    </div>
                                    <div class="td Fechatd">
                                        {items.fechaPedido}
                                    </div>
                                    <div class="td">
                                        {items.montoDeposito}
                                    </div>
                                    <div class="td">
                                        <span>
                                            {items.montoRetiro} 
                                        </span>
                                    </div>
                                    
                                        <p class="status">
                                            {items.status}
                                        </p>
                                
                                    {
                                        items.status === 'aceptada'?(
                                            <Link to={`/Dashboard/VerifyOrder/${items.idPedido}/${items.idUsuario}`}>
                                                <img src={palometa} alt=""/>
                                            </Link>
                                        ):null 
                                    }
                                    
                                    {
                                        items.status !=='verificada'?(
                                            <img onClick={getUpdate}
                                            id={items.idPedido}
                                            status='cancelada'
                                            idUsuario={items.idUsuario}
                                            src={cerrarDetalles}
                                            correoUsuario={items.correo}
                                            nombreUsuario={items.nombre+' '+items.apellido}
                                            idOperador={!items.idOperador?' ':items.idOperador}
                                            nombreOperador={!items.nombreOperador?' ':items.nombreOperador}
                                            correoOperador={!items.correoOperador?' ':items.correoOperador} 
                                            alt=""/>
                                        ):null
                                    }
       
                        <img  src={detalles} alt=""
                            id="cerrar" onClick={show}/>
                        <div className="tdSub">
                        <article class="DetallesTabla">
                            <div>
                                <img src={enviado} alt=""/>
                                <span>
                                    <h3>Orden status: {items.status}</h3>
                                    <p>Id de orden {items.idPedido}</p>
                                </span>
                            </div>
                            <article class="DatosDetalles">
                                <div>
                                    <h2>Remitente</h2>
                                    <p>
                                       <span>Tipo Moneda:</span> {items.monedaDeposito}
                                        <br/>
                                        <span>Nombres:</span> {items.nombre} {items.apellido}
                                        <br/>
                                        <span>Doc. Identidad:</span> {items.dni}
                                        <br/>
                                        <span>Direccion:</span> {items.direccion}
                                        <br/>
                                        
                                        <span>Correo:</span> {items.correo}
                                        <br/>
                                        <span>Refenecia Deposito:</span> {!items.referenciaDeposito?'Por Definir':items.referenciaDeposito}
                                    </p>
                                </div>
                                <img src={advertencia} alt=""/>
                                <div>
                                    <h2>destinatario</h2>
                                    <p>
                                       <span>Pais:</span> {items.paisBanco}
                                        <br/>
                                        <span>Nombres:</span> {items.titular}
                                        <br/>
                                        <span>Doc. Identidad:</span> {items.dniTitular}
                                        <br/>
                                        <span>Banco:</span> {items.banco}
                                        <br/>
                                        <span>Numero de cuenta:</span>
                                        {items.numeroCuenta}
                                        <br/>
                                        
                                    </p>
                                </div>
                                <span>
                                   <p>
                                        monto: <span>
                                            {items.montoDeposito} {items.monedaDeposito}
                                        </span>
                                    </p>
                                    <p>
                                        Taza del dia: <span>
                                           {items.tazaCambio}
                                        </span>
                                       
                                    </p>
                                     Operador: <span>
                                        {!items.nombreOperador?' ':items.nombreOperador}
                                        </span>
                                </span>
                                <br/>
                                <span>
                                   <p>
                                   referencia bancaria: <span>
                                           Definir por administrador
                                        </span>
                                    </p>
                                    <p>
                                        total recibir: <span class="TotalDestino">
                                            {items.montoRetiro} bsf
                                        </span>
                                    </p>                       
                                </span>
                            </article>
                            <div className="Botones">
                            <p className="btnBlue print" onClick={redi}>descargar</p> <p className="btnBlue" >Imprimir</p>
                            </div>
                            
                        </article>
                            </div>
                        </span>
                        ):null
                    })
                        
                    }
              </div>
              
        </section> 
        <button
              style={
                  {
                      
                      margin:'3vmin',
                  }
              }
              className='btnBlue'
               onClick={()=>setLimit(limit+10)}>
                  
                  mostrar más</button> 
                 
        </Fragment>   
        ) 
} 

export default PedidosCliente