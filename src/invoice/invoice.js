module.exports = (pedido) => {
    
return `
    <html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-no-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <style>

        article{
            font-family: roboto;
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
        .flecha{
            width: 30px;
            height: 30px;
         
            background:linear-gradient(315deg, white 50%, #01578c 50%);
            position: relative;
            transform: rotate(135deg);
            overflow: hidden;
            border: 1px solid white;
            margin: 0 0 0 -10px;
        }
        .DetallesTabla {
            position: relative;
        }

        .DetallesTabla>div {
            width: 90%;
            position: relative;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .DetallesTabla>div>img {
            padding-right: 15px;
            height: 60px;
        }

        .DetallesTabla>div>span {
            display: flex;
            flex-flow: column;
            align-items: flex-start;
        }

        .DatosDetalles {
            display: grid;
            grid-template-columns: 1fr 25px 1fr;
            background-color: white;
            justify-content: center;
            align-items: center;
        }

        .DatosDetalles>div {
            background-color: #e1f5fc;
            margin: 10px 20px;
            padding: 20px;
            height: 90%;
            border-radius: 10px;

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

        .DatosDetalles>span>p {
            text-align: left;
            border-bottom: 1px solid #5f8e44;
            line-height: 2;
            font-size: 13px;
            text-transform: capitalize;
            ;
            position: relative;
        }

        .DatosDetalles>span>p>span {
            font-weight: bold;
            position: absolute;
            right: 3%;
            color: #5f8e44;
        }

        .TotalDestino {
            font-size: 16px;
            line-height: 1.8;
        }

        .Botones {
            display: flex ;
            flex-flow: row ;
            justify-content: flex-end !important;
            text-align: right;
        }

        .Botones>p {
            font-size: 14px;
            width: 90px;
            text-align: center;
            color: white;
            margin: 1% 10px 0 0;
            cursor: pointer;
        }

        @media only screen and (max-width:720px) {
             .DatosDetalles {
                display: flex;
                flex-flow: column;
            }

            .flecha{
            transform: rotate(225deg);
            margin: 0px auto 10px;
            }

            .DatosDetalles>span>p {
                line-height: 3;
            }

            .DatosDetalles>span>p>span {
                line-height: 3;
            }

            .DatosDetalles>span>p:nth-child(4) {
                display: none;
            }
        }
    </style>

    <title>tablero</title>

</head>

<body>

    <main>
        <article class="DatosDetalles">
            <div>
                <h2>Remitente</h2>
                <p>
                    <span>Pais:</span> Argentina
                    <br>
                    <span>Nombres:</span> ernesto medina
                    <br>
                    <span>C.I:</span> 85.265.545
                    <br>
                    <span>Direccion:</span> Calle san francisco de estaban,castellon ,españa.
                    <br>

                    <span>telefono:</span> 0421 215 22154
                </p>
            </div>
            <span><div class="flecha"></div></span>
            <div>
                <h2>destinatario</h2>
                <p>
                    <span>Pais:</span> Venezuela
                    <br>
                    <span>Nombres:</span> ernesto medina
                    <br>
                    <span>C.I:</span> 85.265.545
                    <br>
                    <span>Banco:</span> BBVAprovincial
                    <br>
                    <span>Numero de cuenta:</span>
                    0108621414123151
                    <br>

                </p>
            </div>
            <span>
                <p>
                    monto: <span>
                        ${pedido.montoDeposito} ${pedido.monedaDeposito}
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
            <br />
            <span>
                <p>
                    referencia bancaria: <span>
                        Definir por administrador
                    </span>
                </p>
                <p>
                    total recibir: <span className="TotalDestino">
                        ${pedido.montoRetiro} bsf
                    </span>
                </p>
            </span>
        </article>
        
    </main>
</body>

</html>
    `;
};