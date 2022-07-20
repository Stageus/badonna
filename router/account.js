const router=require("express").Router()
const path=require("path")
const pgInit=require("../database/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")
const jwt=require("jsonwebtoken")

const secretKey=process.env.TOKEN_SCREAT_KEY

router.post("/login",(req,res)=>{

   const idValue=req.body.id
   const pwValue=req.body.pw

   const api_name=req.url
   const req_host=req.headers.req_host
   const api_call_time=moment()

    const result={
        "success":false,
        "message":null,
        "token":null,
    }
    
    //db 연결
    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err)
            console.log(err)
    })
   
    const sql="SELECT * FROM  badonnaproject.account WHERE id=$1 and pw=$2"
    const values=[idValue,pwValue]

    db.qeury(sql,values,(err,data)=>{
        if(!err){

            //token
            // const row=data.rows;
            // if(row.length == 0){
            // }else{
            //     const jwtToken=jwt.sign(
            //         {
            //             "id":idValue,//로그인 한 사람의 아이디
            //             "pw":pwValue
            //         },
            //         secretKey,
            //         {
            //             "issuer": "kelly",// 발급자 메모용
            //             "expiresIn":"1m" //토큰 완료 시간
            //         }
            //     )
                
            //     result.token=jwtToken
            //     result.success=true
                
            // }

            //loggin 
            logFuntion(idValue, api_name,req_host,api_call_time)
        }
        res.send(result)
        db.end()

    })
   
})

//회원 가입

router.post("/",(req,res)=>{

    const idValue=req.body.id
    const pwValue=req.body.pw
    const user_name=req.body.name
    const user_birth=req.body.birth 
    const join_date=req.body.data

    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }

    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err)
            console.log("db connect",err)
    })
 
    const sql="INSERT INTO badonnaproject.account(id,pw,name, phonenum, date) VALUES($1,$2,$3,$4,$5)"
    const values=[idValue,pwValue,user_name,user_birth,join_date]
    db.query(sql,values,(err,rows)=>{
        if(!err){
            result.success=true
        }else{
            console.log(err)
        }

        //logging 
        logFuntion(idValue, api_name,req_host,api_call_time)
         
        res.send(result)
        db.end()
    })

})


router.get("/",(req,res)=>{
    
    const idValue=req.query.id 
    const token_public=req.headers.token
     
    const result={
        "success":false,
		"data":null
    }
//token verify 
    if(tokenVerify(token_public)){

        const db=new Client(pgInit)
        db.connect((err)=>{
            if(err)
                console.log(err)
        })

        const sql="SELECT * FROM  badonnaproject.account WHERE userid=$1"
        const values=[idValue]
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
                result.data=row
            }else{
                console.log(err)
            }
            
            res.send(result)
            db.end()
        })
    }else{
        result.message="잘못된 token!"
    }
    

})

//중복 아이디 체크 
router.post("/account/duplicate/id",(req,res)=>{
    const idValue=req.body.id

   const api_name=req.url
   const req_host=req.headers.req_host
   const api_call_time=moment()

    const result={
        "success":false
    }
    
    //db 연결
    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err)
            console.log(err)
    })
   
    const sql="SELECT * FROM  badonnaproject.account WHERE id=$1"
    const values=[idValue]

    db.qeury(sql,values,(err,data)=>{
        if(!err){
            const row=data.rows
            if(row == idValue)
                result.success=true
            else
                result.success=false
        }

        res.send(result)
        db.end()
    })

})


module.exports=router