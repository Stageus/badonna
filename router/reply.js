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
    const coment_number=req.body.coment_num 
    const reply_contents=req.body.contents
    const user_name=req.body.name

    const api_name="reply" + req.url
    const req_host=req.headers.req_host
    const req_data=[coment_number,reply_contents,user_name]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }

    try{
        if(coment_number.length == 0 || coment_number == null ){
            result.message="옳바르지 않은 댓글 번호 입니다."
            res.send(result)
        }else if(reply_contents.length == 0 || reply_contents == null || reply_contents >200){
            result.message="옳바르지 않은 대댓글 내용 입니다."
            res.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db = new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
                })
                const sql="INSERT INTO badonnaproject.reply(coment_num,contents,name) VALUES($1,$2,$3)"
                const values=[coment_number,reply_contents,user_name]
                
                db.query(sql,values,(err,row)=>{
                    if(!err){
                        result.success=true
                    }else{
                        console.log(err)
                    }

                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                    res.send(result)
                    db.end()
                })
            }else{
                result.message="잘못된 토큰 입니다."
                res.send(result)
            }
        }

    }catch(e){
        result.message="에러 입니다."
        res.send(result)
    }




})

router.get("/",(req,res)=>{

    const token_public=req.headers.token 
    const reply_number=req.query.reply_num 

    const api_name="reply" + req.url
    const req_host=req.headers.req_host
    const req_data=[reply_number]
    const api_call_time=moment()

    const result={
        "success":false,
        "data":null,
        "message":null
    }

    try{
        if(reply_number.length ==0 || reply_number == null){
            result.message="옳바르지 않은 대댓글 번호 입니다."
            result.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db = new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
                })
                const sql="SELECT contents,name FROM  badonnaproject.reply WHERE reply_num=$1"
                const values=[reply_number]
                
                db.query(sql,values,(err,row)=>{
                    if(!err){
                        result.success=true
                        result.data=row.rows[0]
                    }else{
                        console.log(err)
                    }

                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                    res.send(result)
                    db.end()
                })
            }else{
                result.message="잘못된 토큰"
                res.send(result)
            }
        }

    }catch(e){
        result.message="에러 입니다."
        res.send(result)
    }

})


router.put("/",(req,res)=>{
    const token_public=req.headers.token 
    const coment_number=req.body.coment_num 
    const reply_number=req.body.reply_num 
    const reply_contents=req.body.contents

    const api_name="reply" + req.url
    const req_host=req.headers.req_host
    const req_data=[coment_number,reply_number,reply_contents]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }

    try{

        if(coment_number.length == 0 || coment_number == null){
            result.message="옳바르지 않은 댓글 번호 입니다."
            res.send(result)
        }else if(reply_number.length == 0 || reply_number == null){
            result.message="옳바르지 않은 대댓글 번호 입니다."
            res.send(result)
        }else if(reply_contents.length == 0 || reply_contents == null || reply_contents.length >200){
            result.message="옳바르지 않은 대댓글 내용 입니다."
            res.send(result)
        }else{
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
                    logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                    res.send(result)
                    db.end()
                })
            }else{
                result.message="잚못된 토큰"
                res.send(result)
            }
        }

    }catch(e){
        result.message="에러 입니다."
        res.send(result)
    }
})


router.delete("/",(req,res)=>{
    const token_public=req.headers.token 
    const reply_number=req.body.reply_num 

    const api_name="reply" + req.url
    const req_host=req.headers.req_host
    const req_data=[reply_number]
    const api_call_time=moment()
    const res_data=" "

    const result={
        "success":false,
        "message":null
    }

    try{
        if(reply_number.length == 0 || reply_number == null){
            result.message="옳바르지 않은 대댓글 번호 입니다."
            res.send(result)
        }else{

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
                    logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                    res.send(result)
                    db.end()
                    
                })

            }else{
                result.message="잘못된 토큰"
                res.send(result)
            }
        }

    }catch(e){
        result.message="에러 입니다."
        res.send(result)
    }

})

module.exports=router