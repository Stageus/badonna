const router=require("express").Router()
const path=require("path")
const pgInit=require("../database/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")
const jwt=require("jsonwebtoken")


router.post("/board",(req,res)=>{

    const board_title=req.body.title
    const board_contents=req.body.contents
    const board_place=req.body.place
    const user_id=req.body.writer 
    const board_date=req.body.data 

    const token_public=req.headers.token
    const board_count=req.body.count //redis에 저장 할 것이다. 

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

        const sql=""
        const values=[user_id, board_title,board_contents,board_date,board_place]
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
            }else{
                console.log(err)
            }
        })

    }else{
        result.message="잘못된 token!"
    }



})







module.exports=router