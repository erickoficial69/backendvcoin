
module.exports = (pedido) => {
    
return `
<!DOCTYPE html>
    
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-no-scale=1, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <style>
        *{
            margin:0;
            padding:0;
            font-size:8px !important;
        }
        body{
            font-family: sans-serif;
            width:100%;
            position:relative;
            margin:0 auto;
        }

        h1,
        h2,
        h3,
        h4 {
            color: rgb(16, 108, 160);
            line-height: 2;
        }

        h1,
        h2 {
            text-transform: uppercase;
            text-align: center;
        }

        h1 {
            font-size: 16px !important;
        }

        h2 {
            font-size: 14px !important;
        }

        p>span {
            line-height: 2;
            color: #106ca0;
            font-size: 12px !important;
            text-transform: uppercase;
            word-wrap: break-word !important;
        }
        /*-------------------------------------------
-------------   Detalles table ------------------
---------------------------------------------*/
        .Cabecera{
            margin: 0;
            padding: 0 0 5px 0;
            height: 60px;
            border-bottom: 2px solid grey;
        }
        .Cabecera>div{
            text-align: center;
            margin-left: 5px;
        }
        .Cabecera>div>img{
            height: 50px;
            padding: 5px 10px;
            float:left;
            background-color: rgb(16, 108, 160);
            border-radius: 5px;
            margin: 0 auto;
        }
        .Cabecera>h1{
             color: rgb(16, 108, 160);
            line-height: 4;
        }
        .DatosDetalles{
            position: relative;
            margin: 0px auto;
            width: 95%;
        }
        .DatosDetalles>div {
            background-color: #e1f5fc;
            margin: 10px auto;
            padding: 5px 10px;
            height: 180px;
            border-radius: 10px;
            overflow:hidden;
            width: 250px !important;
            max-width: 250px !important;
        }
        .Remitente{
          float: left;
            width: 250px !important;
            max-width: 250px !important;
        }
        .Destino{
           float: right;
            width: 250px !important;
            max-width: 250px !important;           
        }

        .DatosDetalles>div>h2 {
            text-transform: uppercase;
            line-height: 2;
            font-size: 12px !important;
            margin-top: 5px;
        }

        .DatosDetalles>div>p>span {
            color: rgb(16, 108, 160);
        }

        .DatosDetalles>div>p {
            text-align: left;
            margin: 0 3%;
            font-size: 12px !important;
            color: #767676;
            line-height: 1.4;
            text-transform: capitalize;
        }

        .DatosDetalles>span {
            width: 90%;
            margin: 0 auto;
        }
        .Totales{
            width: 90%;
            margin: 0 auto;
        }
        .Totales>span{
            width: 48%;
            margin: 0 auto;
        }
        .Totales>span>p {
            text-align: left;
            border-bottom: 1px solid #5f8e44;
            line-height: 2;
            font-size: 12px !important;
            text-transform: capitalize;
            position: relative;
        }

        .Totales>span>p>span {
            position: absolute;
            right: 3%;
            color: #5f8e44;
        }

        .TotalDestino{
            font-size: 12px !important;
            line-height: 1.8;
        }
        .TotalRemitente{
            float: left;
        }
        .TotalDestino{
             float: right;   
        }
        .Cortar{
            width: 100%;
            height: 0px;
            padding: 15px 0;
            clear: both;
            border-bottom: 3px dashed grey;
        }
    </style>

    <title>tablero</title>

</head>

<body>

    <main>
        <article>
          <div class="Cabecera">
             <div>
              <img src="./img/logoTransparente.png" alt="">
              </div>
              <h1>Factura de orden #${pedido.idPedido}</h1>
          </div>
           <div class="DatosDetalles">
            <div class="Remitente">
                <h2>Remitente</h2>
                <p>
                    <span>Moneda:</span> ${pedido.monedaDeposito}
                    <br>
                    <span>Nombres:</span> ${pedido.nombreUsuario}
                    <br>
                    <span>Doc. Identidad:</span> ${pedido.dniUsuario}
                    <br>
                    <span>Telefono:</span> ${pedido.telefonoUsuario}
                    <br>
                    <span>Referencia Deposito:</span> ${pedido.referenciaDeposito?pedido.referenciaDeposito:'por definir'}
                </p>
            </div>
            
            <div class="Destino">
                <h2>${pedido.status==='pagada' || pedido.status==='completada' ?'destinatario':'Cuenta Vcoin'}</h2>
                <p>
                    <span>Pais:</span> ${pedido.paisVcoin?pedido.paisVcoin:''}
                    <br>
                    <span>Nombres:</span> ${pedido.titularVcoin?pedido.titularVcoin:''}
                    <br>
                    <span>Doc. IDENTIDAD</span> ${pedido.dniTitularVcoin?pedido.dniTitularVcoin:''}
                    <br>
                    <span>Banco:</span> ${pedido.bancoVcoin?pedido.bancoVcoin:''}
                    <br>
                    <span>Numero de cuenta:</span>
                    ${pedido.nCuentaVcoin?pedido.nCuentaVcoin:''}
                    <br>
                </p>
            </div>
            </div>
            <div class="Totales">
            <span class="TotalRemitente">
                <p>
                    monto: <span>
                        ${pedido.montoDeposito}
                    </span>
                </p>
                <p>
                    Taza del dia: <span>
                        ${pedido.tazaCambio}
                    </span>
                </p>
                <p>
                    Operador: <span>
                        ${pedido.nombreOperador}
                    </span>
                </p>
                <br/>
                <br/>
                <br/>
                <br/>
                <p>
                    Firma Operador: <span className="TotalDestino">
                        
                    </span>
                </p>
            </span>
            <span class="TotalDestino">
            <p>
                    Fecha: <span>
                        ${pedido.fechaPedido}
                    </span>
                </p>
                <p>
                    referencia bancaria: <span>
                        ${pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'}
                    </span>
                </p>
                <p>
                    total recibir: <span className="TotalDestino">
                        ${pedido.montoRetiro} bsf
                    </span>
                </p>
                <br/>
                <br/>
                <p>
                    Firma Cliente: <span className="TotalDestino">
                        
                    </span>
                </p>
            </span>
            </div>
        </article>
        
        <div class="Cortar"></div>
        <br/>
        <br/>

        <article>
          <div class="Cabecera">
             <div>
              <img src="./img/logoTransparente.png" alt="">
              </div>
              <h1>Factura de orden #${pedido.idPedido}</h1>
          </div>
           <div class="DatosDetalles">
            <div class="Remitente">
            <h2>Remitente</h2>
            <p>
                <span>Moneda:</span> ${pedido.monedaDeposito}
                <br>
                <span>Nombres:</span> ${pedido.nombreUsuario}
                <br>
                <span>Doc. Identidad:</span> ${pedido.dniUsuario}
                <br>
                <span>Telefono:</span> ${pedido.telefonoUsuario}
                <br>
                <span>Referencia Deposito:</span> ${pedido.referenciaDeposito?pedido.referenciaDeposito:'por definir'}
            </p>
            </div>
            <span class="F"><div class="flecha"></div></span>
            <div class="Destino">
                <h2>${pedido.status==='pagada' || pedido.status==='completada' ?'destinatario':'Cuenta Vcoin'}</h2>
                <p>
                    <span>Pais:</span> ${pedido.paisVcoin?pedido.paisVcoin:''}
                    <br>
                    <span>Nombres:</span> ${pedido.titularVcoin?pedido.titularVcoin:''}
                    <br>
                    <span>Doc. IDENTIDAD</span> ${pedido.dniTitularVcoin?pedido.dniTitularVcoin:''}
                    <br>
                    <span>Banco:</span> ${pedido.bancoVcoin?pedido.bancoVcoin:''}
                    <br>
                    <span>Numero de cuenta:</span>
                    ${pedido.nCuentaVcoin?pedido.nCuentaVcoin:''}
                    <br>
                </p>
            </div>
            </div>
            <div class="Totales">
            <span class="TotalRemitente">
                <p>
                    monto: <span>
                        ${pedido.montoDeposito}
                    </span>
                </p>
                <p>
                    Taza del dia: <span>
                        ${pedido.tazaCambio}
                    </span>
                </p>
                <p>
                    Operador: <span>
                        ${pedido.nombreOperador}
                    </span>
                </p>
                <br/>
                <br/>
                <br/>
                <br/>
                <p>
                    Firma Operador: <span className="TotalDestino">
                        
                    </span>
                </p>
            </span>
            <span class="TotalDestino">
            <p>
                    Fecha: <span>
                        ${pedido.fechaPedido}
                    </span>
                </p>
                <p>
                    referencia bancaria: <span>
                    ${pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'}
                    </span>
                </p>
                <p>
                    total recibir: <span className="TotalDestino">
                        ${pedido.montoRetiro} bsf
                    </span>
                </p>
                <br/>
                <br/>
                <p>
                    Firma Cliente: <span className="TotalDestino">
                        
                    </span>
                </p>
            </span>
            </div>
        </article>
        
    </main>
</body>

</html>
`
};