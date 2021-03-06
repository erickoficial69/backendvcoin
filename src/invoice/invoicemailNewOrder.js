
module.exports = (pedido) => {
    
return `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>New HMTL document by NewJect</title>

</head>

<body>
    <br>
    <br>
    <div style="
       width: 90%;
       position: relative;
       margin: 0 auto;
       border: 1px solid grey;
       ">
        <header style="
           width: 100%;
           position: relative;
           margin: 0 auto;
           height: 80px;
           background-color: rgb(16, 108, 160);
           ">
            <img style="
            max-height:70px;
            width: auto;
            margin-top: -90px ;
           " src="https://storagevcoin.ml/images/logo_correo.png" alt="">
        </header>
        <article>
            <div style="
               width: 100%;
               margin: 10px auto;
               display: flex;
               justify-content: center;
               ">
                <img style="
                        padding-right: 15px;
                        padding-top: 5px;
                        height: 60px;
               " src="https://storagevcoin.ml/images/enviado.svg" alt="">
                <span style="
                   margin: 10px 0;
                   ">
                    <h3 style="
                    font-family: sans-serif;
                    color: rgb(16, 108, 160);
                    margin: 0;
                    ">Orden ${pedido.status}</h3>
                    <p style="
                    font-family: sans-serif;
                    color: rgb(122,122,122);
                    margin: 0;
                    ">

                        <strong>
                                ${pedido.idPedido?'#'+pedido.idPedido:''}
                        </strong>
                    </p>
                </span>
            </div>
            <div style="
               width: 75%;
               background-color: #e1f5fc;
    margin: 10px auto;
    padding: 20px;
    height: 70%;
    border-radius: 10px;
               ">
                <h2 style="
                color: #186f9f;
    text-transform: uppercase;
    font-family: sans-serif;
    line-height: 2;
    font-size: 16px;
               margin: -10px 0;
                ">Remitente</h2>
                <p style="
                  padding-bottom: 15px;
                  color: rgb(122,122,122);
                  font-family: sans-serif;
                  border-bottom: 1.5px solid #186f9f;
                  ">
                    <strong style="font-weight: bold;
    color: #186f9f;">Pais:</strong> ${pedido.paisUsuario}
                    <br>
                    <strong style="font-weight: bold;
    color: #186f9f;">Nombres:</strong> ${pedido.nombreUsuario}
                    <br>
                    <strong style="font-weight: bold;
    color: #186f9f;">C.I:</strong> ${pedido.dniUsuario}
                    <br>
                    <strong style="font-weight: bold;
    color: #186f9f;"></strong>
                    <br>

                    <strong style="font-weight: bold;
    color: #186f9f;">telefono:</strong> ${pedido.telefonoUsuario?pedido.telefonoUsuario:''}
                </p>

                <div>
                <h2 style="
            color: #186f9f;
text-transform: uppercase;
font-family: sans-serif;
line-height: 2;
font-size: 16px;
           margin: -10px 0;
            ">pagar a</h2>
                <p style="color:rgb(122,122,122);font-family: sans-serif;">
                        <strong style="font-weight: bold;
                    color: #186f9f;">Pais:</strong> ${pedido.paisVcoin?pedido.paisVcoin:''}
                                        <br>
                        <strong style="font-weight: bold;
                    color: #186f9f;">Nombres:</strong> ${pedido.titularVcoin?pedido.titularVcoin:''}
                                        <br>
                        <strong style="font-weight: bold;
                    color: #186f9f;">C.I:</strong> ${pedido.dniTitularVcoin?pedido.dniTitularVcoin:''}
                                        <br>
                        <strong style="font-weight: bold;
                    color: #186f9f;">Banco:</strong> ${pedido.bancoVcoin?pedido.bancoVcoin:''}
                                        <br>
                        <strong style="font-weight: bold;
                    color: #186f9f;">Numero de cuenta:</strong> ${pedido.nCuentaVcoin?pedido.nCuentaVcoin:''}
                                        <br>
                                    </p>
            </div>

            </div>
            <div style="
               width: 80%;
               margin: 0 auto;
               position: relative;
               ">
                <span>
                    <p style="
                       text-align: left;
    border-bottom: 1px solid #5f8e44;
    line-height: 2;
    font-size: 13px;
    position: relative;
                      font-family: sans-serif;
                       ">
                        monto deposito: <strong style="
                               font-weight: bold;
    position: absolute;
    right: 3%;
    color: #5f8e44;
                              
                               ">
                               ${pedido.montoDeposito} ${pedido.monedaDeposito}
                        </strong>
                    </p>
                    <p style="
                       text-align: left;
    border-bottom: 1px solid #5f8e44;
    line-height: 2;
    font-size: 13px;
    position: relative;
                      font-family: sans-serif;
                       ">
                        Monto retiro: <strong style="
                              font-weight: bold;
    position: absolute;
    right: 3%;
    color: #5f8e44;
                               ">
                               ${pedido.montoRetiro} ${pedido.monedaRetiro}
                        </strong>
                    </p>
                </span>
            </div>

        </article>
    </div>

</body>

</html>
`
};