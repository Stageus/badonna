const router=require("express").Router()
const path=require("path")
const pgInit=require("../module/psql")
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

   const api_name="account" + req.url
   const req_host=req.headers.req_host
   const req_data=[idValue,pwValue]
   const api_call_time=moment()

    const result={
        "success":false,
        "message":null,
        "token":null,
    }
    
    //db 연결
    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err) {
            console.log(err)
        }
    })
   
    const sql="SELECT * FROM  badonnaproject.account WHERE id=$1 and pw=$2"
    const values=[idValue,pwValue]
   // console.log(values)
    db.query(sql,values,(err,data)=>{
        if(!err){

            const row=data.rows;
            if(row.length == 0){
            }else{
                const jwtToken=jwt.sign(
                    {
                        "id":idValue,//로그인 한 사람의 아이디
                        "pw":pwValue
                    },
                    secretKey,
                    {
                        "issuer": "kelly",// 발급자 메모용
                        "expiresIn":"24h" //토큰 완료 시간
                    }
                )
                console.log("token",jwtToken)
                result.token=jwtToken
                result.success=true
                
            }

            //loggin 
            logFuntion(api_name,req_host, req_data, data.rows[0],api_call_time)
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
    const user_phone=req.body.phone_num
    const join_date=req.body.date
 
    const api_name="account" + req.url
    const req_host=req.headers.req_host
    const req_data=[idValue,pwValue,user_name,user_phone,join_date]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }
    
    if(idValue.length!=0 && pwValue.length !=0 && user_name.length !=0 && user_phone.length !=0 && join_date.length !=0) {
       
        const db=new Client(pgInit)
        db.connect((err)=>{
            if(err)
                console.log("db connect",err)
        })
    
        const sql="INSERT INTO badonnaproject.account(id,pw,name, phonenum,date) VALUES($1,$2,$3,$4,$5)"
        const values=[idValue,pwValue,user_name,user_phone,join_date]
        db.query(sql,values,(err,data)=>{
            if(!err){
                result.success=true
            }else{
                console.log(err)
            }

            //logging 
            logFuntion(api_name,req_host, req_data, data.rows[0],api_call_time)
            
            res.send(result)
            db.end()
        })
    }else{
        result.message="회원가입 실패"
        res.send(result)
    }

})


router.get("/",(req,res)=>{
    
    const idValue=req.query.id 
    const token_public=req.headers.token
     
    const api_name="account" + req.url
    const req_host=req.headers.req_host
    const req_data=[idValue]
    const api_call_time=moment()

    const result={
        "success":false,
		"data":null
    }

    if(idValue.length !=0){
        //token verify 
        if(tokenVerify(token_public)){

            const db=new Client(pgInit)
            db.connect((err)=>{
                if(err) {
                    console.log(err)
                }
            })

            const sql="SELECT * FROM  badonnaproject.account WHERE id=$1"
            const values=[idValue]
            db.query(sql,values,(err,row)=>{
                if(!err){
                    result.success=true
                    result.data=row.rows[0]
                }else{
                    console.log(err)
                }
                
                //logging
                logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                res.send(result)
                db.end()
            })
        }else{
            result.message="잘못된 token!"
            res.send(result)
        }
    }else{
        result.message="실패"
        res.send(result)
    }    

})

//중복 아이디 체크 
router.post("/duplicate/id",(req,res)=>{
    const idValue=req.body.id

    const api_name="account" + req.url
    const req_host=req.headers.req_host
    const req_data=[idValue]
    const api_call_time=moment()

    const result={
        "success":false
    }
    
    //db 연결
    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err) {
            console.log(err)
        }
    })
   
    const sql="SELECT * FROM  badonnaproject.account WHERE id=$1"
    const values=[idValue]

    db.query(sql,values,(err,data)=>{
        if(!err){
            const row=data.rows[0].id
            console.log(row)
            if(row == idValue)
                result.success=true
            else
                result.success=false
        }

        //loggin 
        logFuntion(api_name,req_host, req_data, data.rows[0],api_call_time)

        res.send(result)
        db.end()
    })

})


module.exports=router