const router=require("express").Router()
const path=require("path")
const pgInit=require("../database/psql")
const {Client}=require("pg")

router.post("/",(req,res)=>{
   
    const resutl={
        "succeed":false
    }
    
    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err)
            console.log(err)
    })

    resutl.succeed=true

    res.send(resutl)
})





module.exports=router