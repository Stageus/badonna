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
    const board_member=req.body.board_num
    const coment_number=req.body.comment_num 
    const reply_contents=req.body.contents
    const user_name=req.body.id

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
        }else if(reply_contents.length == 0 || reply_contents == null || reply_contents.length > 200){
            result.message="옳바르지 않은 대댓글 내용 입니다."
            res.send(result)
        }else if(board_member.length == 0 || board_member == null || board_member.length > 200){
            result.message="옳바르지 않은 게시글 번호 입니다."
            res.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db = new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
                })
                const sql="INSERT INTO badonnaproject.reply(comment_num,board_num,reply_contents,reply_id) VALUES($1,$2,$3,$4)"
                const values=[coment_number,board_member,reply_contents,user_name]
                
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
    const reply_number=req.query.board_num
    const idValue=req.query.id

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
                const sql="SELECT * FROM  badonnaproject.reply WHERE board_num=$1 AND reply_id=$2"
                const values=[reply_number, idValue]
                
                db.query(sql,values,(err,row)=>{
                    if(!err){
                        result.success=true
                        result.data=row.rows
                    }else{
                        console.log(err)
                    }

                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, row.rows,api_call_time)

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
                const sql="UPDATE badonnaproject.reply SET reply_contents=$3 WHERE comment_num=$1 AND reply_num=$2"
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