
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
            box-sizing:border-box;
        }
        body{
            font-family: sans-serif;
        }

        h1,
        h2,
        h3,
        h4 {
            color: rgb(16, 108, 160);
            font-weight: bold;
            line-height: 2;
        }

        h1,
        h2 {
            text-transform: uppercase;
            text-align: center;
        }

        h1 {
            font-size: 25px;
        }

        h2 {
            font-size: 20px;
        }

        p>span {
            font-weight: bolder;
            line-height: 2;
            color: #106ca0;
            text-transform: uppercase;
            word-wrap: break-word !important;
        }
        /.flecha{
            width: 30px;
            height: 30px;
            background:linear-gradient(315deg, white 50%, #01578c 50%);
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            transform: rotate(135deg);
            overflow: hidden;
            border: 1px solid white;
            margin: 100px 0 0 -10px;
        }

        /*-------------------------------------------
-------------   Detalles table ------------------
---------------------------------------------*/
        .Cabecera{
            background-color: rgb(16, 108, 160);
            margin: 0;
            padding: 0;
            height: 60px;
        }
        .Cabecera>img{
            height: 50px;
            padding: 5px 10px;
            float:left;
        }
        .Cabecera>h1{
            color: white;
        }
        .DatosDetalles{
            
            position: relative;
            margin: 0 auto;
            width: 100%;
        }
        .DatosDetalles>div {
            background-color: #e1f5fc;
            margin: 10px 5px;
            padding: 20px;
            width: 270px;
            height: 210px;
            border-radius: 10px;
        }
        .Remitente{
          float: left;
        }
        .F{
            max-width: 25px;
            display: none;
        }
        .Destino{
           float: right;
            
        }

        .DatosDetalles>div>h2 {
            text-transform: uppercase;
            line-height: 2;
            font-size: 16px;
            margin-top: -15px;
        }

        .DatosDetalles>div>p>span {
            font-weight: bold;
            color: rgb(16, 108, 160);

        }

        .DatosDetalles>div>p {
            text-align: left;
            margin: 0 3%;
            font-size: 16px;
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
            font-size: 13px;
            text-transform: capitalize;
            position: relative;
        }

        .Totales>span>p>span {
            font-weight: bold;
            position: absolute;
            right: 3%;
            color: #5f8e44;
        }

        .TotalDestino {
            font-size: 16px;
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
            padding: 30px 0 15px;
            clear: both;
            border-bottom: 3px dashed grey;
        }

/*

        @media only screen and (max-width:720px) {
             .DatosDetalles {
                display: flex;
                flex-flow: column;
            }

            .flecha{
            transform: rotate(225deg);
            margin: 0px auto 10px;
            }
            .Totales{
                display: flex;
                flex-flow: column;
            }
            .Totales>span{
                width: 75%;
            }
            .Totales>span>p {
                line-height: 3;
            }

            .Totales>span>p>span {
                line-height: 3;
            }

            .Totales>span>p:nth-child(4) {
                display: none;
            }
        }
*/
    </style>

    <title>tablero</title>

</head>

<body>

    <main>
        <article>
          <div class="Cabecera">
              <img src="./img/logoTransparente.png" alt="">
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
            </span>
            </div>
        </article>
        
        <div class="Cortar"></div>

        <article>
          <div class="Cabecera">
              <img src="./img/logoTransparente.png" alt="">
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
            </span>
            </div>
        </article>
        
    </main>
</body>

</html>
`;
};