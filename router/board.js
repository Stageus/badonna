const router=require("express").Router()
const path=require("path")
const pgInit=require("../database/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")



router.post("/",(req,res)=>{

    const board_title=req.body.title
    const board_contents=req.body.contents
    const board_place=req.body.place
    const user_id=req.body.writer 
    const board_date=req.body.data 

    const token_public=req.headers.token
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null,
		"count":null
    } 

    if(tokenVerify(token_public)){//인증 완료 되면 

        const db=new Client(pgInit)
        db.connect((err)=>{
            if(err)
                console.log(err)    
        })

        const sql="INSERT INTO badonnaproject.board(id,title,contents,data,adress) VALUES($1,$2,$3,$4,$5)"
        const values=[user_id, board_title,board_contents,board_date,board_place]
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
                result.message="성공"
            }else{
                console.log(err)
            }
            //로깅 남기기
            logFuntion(user_id, api_name,req_host,api_call_time)

            res.send(result)
            db.end()
        })

    }else{
        result.message="잘못된 token!"
    }



})


router.get("/",(req,res)=>{

    const token_public=req.headers.token
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const board_number=req.query.board_num 
    const user_id=req.query.id //로깅을 위한 데이터 
    let temp=req.query.offset
    let offset_num=temp*10//offset 지정 해주기 위한 변수 
   
    const result={
        "success":false,
        "data":null
    }

    if(tokenVerify(token_public)){

        const db=new Client(pgInit)
        db.connect((err)=>{
            console.log(err)
        })

        const sql="SELECT *FROM badonnaproject.board LIMIT 10 OFFSET=$1"
        const values=[offset_num]

        db.query(sql,values,(err,row)=>{
            if(!err){
                result.data=row// row가 어떤 것이 반환이 되는 지 확인 하기 
                result.success=true
                result.message="성공"
            }else{
                console.log(err)
            }

            //로깅 남기기
            logFuntion(user_id, api_name,req_host,api_call_time)
            res.send(result)
            db.end()
            
        })
    }else{
        result.message="잘 못된 token!"
    }

})


router.delete("/",(req,res)=>{

    const token_public=req.headers.token
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const board_mumber=req.body.board_num 
    const result={
        "success":false
    }

    if(tokenVerify(token_public)){

        const db=new Client(pgInit)
        db.connect((err)=>{
            console.log(err)
        })

        const sql="DELETE FROM badonnaproject.board WHERE board_num=$1;"
        const values=[board_mumber]
        
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
            }else{
                console.log(err)
            }

            //로깅 남기기
            logFuntion(user_id, api_name,req_host,api_call_time)

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

    const board_number=req.body.board_num 
    const board_title=req.body.title
    const board_contents=req.body.contents
    const board_place=req.body.place
    const board_date=req.body.data 

    const result={
        "success":false
    }

    if(tokenVerify(token_public)){

        const db=new Client(pgInit)
        db.connect((err)=>{
            console.log(err)    
        })

        const sql="UPDATE badonnaproject.board SET title=2$,contents=3$,data=4$,adress=5$ WHERE board_num=1$ "
        const values=[board_number,board_title,board_contents,board_date,board_place]
        
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
            }else{
                console.log(err)
            }

            //로깅 남기기
            logFuntion(user_id, api_name,req_host,api_call_time)

            res.send(result)
            db.end()
        })
    }



})


module.exports=router