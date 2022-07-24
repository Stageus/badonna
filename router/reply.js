const router=require("express").Router() 
const path=require("path")
const pgInit=require("../module/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")



router.post("/",(req,res)=>{

    const token_public=req.headers.token 
    const api_name=req.urls
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const coment_number=req.body.coment_num 
    const reply_contents=req.body.contents

    const result={
        "success":false
    }

    if(tokenVerify(token_public)){

        const db = new Client(pgInit)
        db.connect((err)=>{
            if(err) {
                console.log(err)
            }
        })
        const sql="INSERT INTO badonnaproject.reply(coment_num,contents) VALUES($1,$2)"
        const values=[coment_number,reply_contents]
        
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
            }else{
                console.log(err)
            }

            //로깅 남기기
            //logFuntion(user_id, api_name,req_host,api_call_time)

            res.send(result)
            db.end()
        })
    }




})

router.get("/",(req,res)=>{

    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const reply_number=req.query.reply_num 
    const result={
        "success":false,
        "data":null
    }
    if(tokenVerify(token_public)){

        const db = new Client(pgInit)
        db.connect((err)=>{
            if(err) {
                console.log(err)
            }
        })
        const sql="SELECT contents FROM  badonnaproject.reply WHERE reply_num=$1"
        const values=[reply_number]
        
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
                result.data=row.rows[0]
            }else{
                console.log(err)
            }

            //로깅 남기기
            //logFuntion(user_id, api_name,req_host,api_call_time)

            res.send(result)
            db.end()
        })
    }


})


router.put("/",(req,res)=>{
    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const coment_number=req.body.coment_num 
    const reply_number=req.body.reply_num 
    const reply_contents=req.body.contents

    const result={
        "success":false,
    }
    if(tokenVerify(token_public)){

        const db = new Client(pgInit)
        db.connect((err)=>{
            if(err) {
                console.log(err)
            }
        })
        const sql="UPDATE badonnaproject.reply SET contents=$3 WHERE coment_num=$1 AND reply_num=$2"
        const values=[coment_number,reply_number,reply_contents]
        
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
            }else{
                console.log(err)
            }

            //로깅 남기기
            //logFuntion(user_id, api_name,req_host,api_call_time)

            res.send(result)
            db.end()
        })
    }

})


router.delete("/",(req,res)=>{
    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const reply_number=req.body.reply_num 
    const result={
        "success":false
    }

    if(tokenVerify(token_public)){

        const db = new Client(pgInit)
        db.connect((err)=>{
            if(err) {
                console.log(err)
            }
        })

        const sql="DELETE FROM badonnaproject.reply WHERE reply_num=$1;"
        const values=[reply_number]
        
        db.query(sql,values,(err,row)=>{

            if(!err){
                result.success=true
            }else{
                console.log(err)
            }
            //로깅 남기기
            //logFuntion(user_id, api_name,req_host,api_call_time)

            res.send(result)
            db.end()
            
        })

    }

})

module.exports=router