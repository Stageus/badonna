const express=require("express")

const app=express()
const port =3000
app.use(express.json())



const accountApi = require("./router/account")
app.use("/account",accountApi)

app.listen(port,()=>{
    console.log(port + "번 포트에서 http통신을 시작 할 것이다.")
})
