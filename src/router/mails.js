const registerMail=(token,email)=>{
    return
        `
<div style="
   background-color: white;
   width: 80%;
   height: 250px;
   position: relative;
   margin: 0 auto;
   text-align: center;
   border: 2px solid #eaeaea;
   border-radius: 15px;
   overflow: hidden
   ">
        <h1 style="
    font-size:30px;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    font-family: sans-serif;
    color: white;
    background-color: rgb(16, 108, 160);
    padding: 15px 0;
    margin-top: -1px;
    line-height: 2;
    ">¡Bienvenido!</h1>
        <p style="
       color: rgb(122,122,122);
       text-align: left;
       font-size: 16px;
       font-family: sans-serif;
       padding: 0 20px;
       margin-bottom: 50px;
       ">
            Para contuniar con el registro de tu cuenta en VcoinTransfer verifica este correo usando el boton <strong style="
        color: rgb(16, 108, 160);
        font-family: sans-serif;
        font-size: 14px;
        "> AZUL </strong>de alli abajo
        </p>
        <a style="
        background-color: rgb(16, 108, 160);
      
        height: 45px;
        width: 100px;
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-family: sans-serif;
        text-transform: uppercase;
        padding: 10px 25px; 
        border-radius: 7px;
                " href="https://backendvcoin.herokuapp.com/confirm/${token}/${email}/confirmado">Verificar cuenta</a>
    </div>
`

}
module.exports = registerMail