const {Router} = require('express') 

const webpush = require('web-push') 
const pushRoutes = Router()

const pushKeys = {
    publicKey:'BMHh0lPn4yFYftgHa_SsjPm5IzQK0aTotM1cMEP-6Q9dL3i8SJJKldguHGNCY-IT2wGs-oZCPCBTDglQuI9JK58',
    privateKey:'veU435HQFdQiwhq6dCtMLCBts2Sy4qk2Aas67tsVVJg'
    }

webpush.setVapidDetails('mailto:erickoficial69@gmail.com',pushKeys.publicKey,pushKeys.privateKey)
const not = {
    titulo:'push of my server'
}
pushRoutes.post('/savepush', async (rq,rs)=>{
    const rsP = rq.body
    console.log(rsP)
})

pushRoutes.get('/sendpush', async (rq,rs)=>{
    const rsP = rq.body
    console.log(rsP)
    const message = JSON.stringify(rsP)
    webpush.sendNotification(rsP,message).catch(e=>console.log(e))
    rs.json({titulo:'received'})
})

module.exports = pushRoutes