const router=require("express").Router()
const path=require("path")
const pgInit=require("../database/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")

const secretKey=process.env.TOKEN_SCREAT_KEY
router.post("/login",(req,res)=>{

   const idValue=req.body.id
   const pwValue=req.body.pw

   const api_name=req.url
   const req_host=req.headers.req_host
   const api_call_time=moment()

    const result={
        "succeed":false,
        "message":"",
        "token":""
    }
    
    //db 연결
    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err)
            console.log(err)
    })
    console.log(secretKey)
    const sql="SELECT * FROM  badonnaproject.account WHERE userid=$1 and userpw=$2"
    const values=[idValue,pwValue]

    // db.qeury(sql,values,(err,data)=>{
    //     if(!err){

    //         //token
    //         const row=data.rows;
    //         if(row.length == 0){
    //         }else{
    //             // const jwtToken=jwt.sign(
    //             //     {
    //             //         "id":idValue,
    //             //         "pw":pwValue
    //             //     },
    //             //     secretKey,
    //             //     {
    //             //         "issuer": "kelly",// 발급자 메모용
    //             //         "expiresIn":"1m" //토큰 완료 시간
    //             //     }
    //             // )
                
    //             // result.token=jwtToken
    //             result.succeed=true
                
    //         }

    //         //loggin 
    //         logFuntion(idValue, api_name,req_host,api_call_time)
    //     }
    //     res.send(result)
    //     db.end()

    // })

    console.log(api_call_time)

    res.send(result)
   
})





module.exports=router