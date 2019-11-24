
module.exports = (pedido) => {
    
return `
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Invoice</title>
    <link rel="license" href="http://www.opensource.org/licenses/mit-license/">
    <style type="text/css">
        /* reset */

        * {
            border: 0;
            box-sizing: content-box;
            color: inherit;
            font-family: inherit;
            font-size: 9px;
            font-style: inherit;
            font-weight: inherit;
            line-height: inherit;
            list-style: none;
            margin: 0;
            padding: 0;
            text-decoration: none;
            vertical-align: top;
            font-family: sans-serif !important;
        }

        /* content editable */

        *[contenteditable] {
            border-radius: 0.25em;
            min-width: 1em;
            outline: 0;
            cursor: pointer;
            display: inline-block;
        }

        *[contenteditable]:hover,
        *[contenteditable]:focus,
        td:hover *[contenteditable],
        td:focus *[contenteditable],
        img.hover {
            background: #DEF;
            box-shadow: 0 0 1em 0.5em #DEF;
        }

        /*span[contenteditable] { display: inline-block; }*/

        /* heading */

        h1 {
            font: bold 100% sans-serif;
            text-align: center;
            text-transform: uppercase;
        }

        /* table */

        table {
            font-size: 75%;
            table-layout: fixed;
            width: 100%;
        }

        table {
            border-collapse: separate;
            border-spacing: 2px;
        }

        th,
        td {
            border-width: 1px;
            padding: 0.5em;
            position: relative;
            text-align: left;
        }

        th,
        td {
            border-radius: 0.25em;
            border-style: solid;
        }

        th {
            background: #115479;
            border-color: #BBB;
            color: white;
        }

        td {
            border-color: #DDD;
        }

        /* page */

        html {
            font: sans-serif;
            overflow: auto;
        }

        html {
            background: #fff;
            cursor: default;
        }

        body {
            box-sizing: border-box;
            margin: 0;
        }

        #wrapper {
            margin: 0 auto;
            width: 14.5cm;
        }

        body {
            background: #FFF;
        }

        /* header */

        header {
            margin: 1em auto 0;
        }

        header:after {
            clear: both;
            content: "";
            display: table;
        }

        header h1 {
            background: #000;
            border-radius: 0.25em;
            color: #FFF;
            margin: 0 0 1em;
            padding: 0.5em 0;
        }



        header span {
            margin: 0 0 1em 1em;
            max-height: 25%;
            max-width: 60%;
            position: relative;
        }

        header img {
            max-height: 40px;
            background-color: #115479;
            border-radius: 5px;
            margin: 0 auto;
            padding: 10px 15px 5px 10px;
        }

        header input {
            cursor: pointer;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
            height: 100%;
            left: 0;
            opacity: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }

        /* article */

        article,
        article address,
        table.meta,
        table.inventory {
            margin: 0 0 1em;
        }

        article:after {
            clear: both;
            content: "";
            display: table;
        }

        article h1 {
            clip: rect(0 0 0 0);
            position: absolute;
        }

        /* table meta & balance */

        table.meta {
            float: right;
            width: 36%;
        }
        table.balance{
            width: 56%;
            float: right;
        }
        .siniestra{
            float: left;
        }

        table.meta:after,
        table.balance:after {
            clear: both;
            content: "";
            display: table;
        }

        /* table meta */

        table.meta th {
            width: 40%;
        }

        table.meta td {
            width: 60%;
        }

        /* table items */

        table.inventory {
            clear: both;
            width: 100%;
        }

        table.inventory th {
            font-weight: bold;
            text-align: center;
        }

        table.inventory td:nth-child(1) {
            width: 26%;
        }

        table.inventory td:nth-child(2) {
            width: 38%;
        }

        table.inventory td:nth-child(3) {
            text-align: right;
            width: 12%;
        }

        table.inventory td:nth-child(4) {
            text-align: right;
            width: 12%;
        }

        table.inventory td:nth-child(5) {
            text-align: right;
            width: 12%;
        }

        /* table balance */

        table.balance th,
        table.balance td {
            width: 50%;
        }

        table.balance td {
            text-align: right;
        }

        /* aside */

        aside h1 {
            border: none;
            border-width: 0 0 1px;
            margin: 0 0 1em;
        }

        aside h1 {
            border-color: #999;
            border-bottom-style: solid;
        }
        

        @media print {
            * {
                -webkit-print-color-adjust: exact;
            }

            html {
                background: none;
                padding: 0;
            }

            body {
                box-shadow: none;
                margin: 0;
            }

            span:empty {
                display: none;
            }
        }

        @page {
            margin: 0;
        }
        /*---------  MIOS  ----------*/
         p>span {
            line-height: 2;
            color: #106ca0;
            font-size: 12px !important;
            text-transform: uppercase;
            word-wrap: break-word !important;
        }
        .Cuentas{
            width: 60px !important;
            padding: 0;
            line-height: 2;
        }
        .Cortar{
            width: 100%;
            height: 0px;
            padding: 15px 0;
            clear: both;
            border-bottom: 3px dashed grey;
        }
        .Firmas{
            width: 14.5cm;
            margin: 50px 0 0;
        }
        .FirmaOperador,.FirmaRemintente{
            width: 6cm !important;
            margin: 0 auto;
            position: relative;
            text-align: center;
        }
        .FirmaOperador{
            float: left; 
            margin-right: 5%;
        }
        .FirmaRemintente{
            clear: both;
            margin-left: 5%;
            padding: 10cm;
        }

    </style>
 
</head>

<body>
    <div id="wrapper">
        <header>
            <span><img alt="" src="https://storagevcoin.ml/images/logo_correo.png" /></span>
            <table class="meta">
                <tr>
                    <th><span>Orden #</span></th>
                    <td><span>${pedido.idPedido}</span></td>
                </tr>
                <tr>
                    <th><span>Fecha</span></th>
                    <td><span>${pedido.fechaPedido}</span></td>
                </tr>
            </table>
        </header>
        <article>      
            <table class="inventory">
                <thead>
                    <tr>
                        <th><span>Remitente</span></th>
                        <th><span>${pedido.status==='pagada' || pedido.status==='completada' ?'destinatario':'Cuenta Vcoin'}</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
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
                        </td>
                        <td class="Cuentas">
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
                       </td>
                    </tr>
                    <tr>
                       <td>
                        <table class="">
                <tr>
                    <th class="Cuentas"><span>Monto</span></th>
                    <td><span>${pedido.montoDeposito}</span></td>
                </tr>
                <tr>
                    <th class="Cuentas"><span>Taza</span></th>
                    <td><span>${pedido.tazaCambio} </span></td>
                </tr>
                <tr>
                    <th class="Cuentas"><span>Operador</span></th>
                    <td><span>${pedido.nombreOperador}</span></td>
                </tr>
            </table>
                   </td>
                   <td>
                       <table>
                <tr>
                    <th class="Cuentas"><span>Total</span></th>
                    <td ><span data-prefix>$</span><span>600.00</span></td>
                </tr>
                <tr>
                    <th class="Cuentas"><span>N° Referencia</span></th>
                    <td><span>${pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'}</span></td>
                </tr>
                <tr>
                    <th class="Cuentas"><span>Balance Due</span></th>
                    <td><span>${pedido.montoRetiro} bsf</span></td>
                </tr>
            </table>
                   </td>
                    </tr>
                </tbody>
            </table>
            <div class="Firmas">
                         <div class="FirmaOperador">
                          <p>Operador:  ________________</p>
                      </div>
                      <div class="FirmaRemitente">
                          <p>Remitente:  ________________</p>
                      </div>
            </div>
        </article>
    </div>
    <div class="Cortar"></div>
    <div id="wrapper">
        <header>
            <span><img alt="" src="https://storagevcoin.ml/images/logo_correo.png" /></span>
            <table class="meta">
                <tr>
                    <th><span>Orden #</span></th>
                    <td><span>${pedido.idPedido}</span></td>
                </tr>
                <tr>
                    <th><span>Fecha</span></th>
                    <td><span>${pedido.fechaPedido}</span></td>
                </tr>
            </table>
        </header>
        <article>      
            <table class="inventory">
                <thead>
                    <tr>
                        <th><span>Remitente</span></th>
                        <th><span>${pedido.status==='pagada' || pedido.status==='completada' ?'destinatario':'Cuenta Vcoin'}</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
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
                        </td>
                        <td class="Cuentas">
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
                       </td>
                    </tr>
                    <tr>
                       <td>
                        <table class="">
                <tr>
                    <th class="Cuentas"><span>Monto</span></th>
                    <td><span>${pedido.montoDeposito}</span></td>
                </tr>
                <tr>
                    <th class="Cuentas"><span>Taza</span></th>
                    <td><span>${pedido.tazaCambio} </span></td>
                </tr>
                <tr>
                    <th class="Cuentas"><span>Operador</span></th>
                    <td><span>${pedido.nombreOperador}</span></td>
                </tr>
            </table>
                   </td>
                   <td>
                       <table>
                <tr>
                    <th class="Cuentas"><span>Total</span></th>
                    <td ><span data-prefix>$</span><span>600.00</span></td>
                </tr>
                <tr>
                    <th class="Cuentas"><span>N° Referencia</span></th>
                    <td><span>${pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'}</span></td>
                </tr>
                <tr>
                    <th class="Cuentas"><span>Balance Due</span></th>
                    <td><span>${pedido.montoRetiro} bsf</span></td>
                </tr>
            </table>    
                   </td>
                    </tr>
                </tbody>
            </table>
            <div class="Firmas">
                         <div class="FirmaOperador">
                          <p>Operador:  ________________</p>
                      </div>
                      <div class="FirmaRemitente">
                          <p>Remitente:  ________________</p>
                      </div>
            </div>
        </article>
    </div>
</body>

</html>
`
};
