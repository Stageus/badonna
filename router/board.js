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
    const user_id=req.body.id
    const board_date=req.body.date 

    const token_public=req.headers.token
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    } 

    if(board_title.length !=0 && board_contents.length !=0 && board_place.length !=0 && user_id.length !=0&& board_date.length !=0 ){

        if(tokenVerify(token_public)){//인증 완료 되면 

            const db=new Client(pgInit)
            db.connect((err)=>{
                if(err)
                    console.log(err)    
            })

            const sql="INSERT INTO badonnaproject.board(id,title,contents,address,date) VALUES($1,$2,$3,$4,$5)"
            const values=[user_id, board_title,board_contents,board_place,board_date]
            db.query(sql,values,(err,row)=>{
                if(!err){
                    result.success=true
                    result.message="성공"
                }else{
                    console.log(err)
                }
                //로깅 남기기
                //logFuntion(user_id, api_name,req_host,api_call_time)

                res.send(result)
                db.end()
            })

        }else{
            result.message="잘못된 token!"
            res.send(result)
        }
    }else{
        result.message="게시글 쓰기 실패"
        res.send(result)
    }



})


router.get("/",(req,res)=>{

    const token_public=req.headers.token
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

   // const board_number=req.query.board_num //처음 일 경우  없어도 되지 않을까?  page 수만 주면 된다. 정렬 해서 보내기
    const user_id=req.query.id //로깅을 위한 데이터 
    let temp=req.query.offset
    let temp_num=parseInt(temp)
    let offset_num=temp_num*10//offset 지정 해주기 위한 변수 
   
    const result={
        "success":false,
        "data":null
    }

    if(tokenVerify(token_public)){

        const db=new Client(pgInit)
        db.connect((err)=>{
            console.log(err)
        })

        const sql="SELECT *FROM badonnaproject.board ORDER BY date DESC LIMIT $1 OFFSET $2"
        const values=[10,offset_num]
    
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.data=row.rows// row가 어떤 것이 반환이 되는 지 확인 하기 
                result.success=true
                result.message="성공"
            }else{
                console.log(err)
            }

            //로깅 남기기
            //logFuntion(user_id, api_name,req_host,api_call_time)

            res.send(result)
            db.end()
            
        })
    }else{
        result.message="잘 못된 token!"
        res.send(result)
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
            //logFuntion(user_id, api_name,req_host,api_call_time)

            res.send(result)
            db.end()
        })

    }else{
        res.send(result)
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
    const board_date=req.body.date

    const result={
        "success":false
    }

    if(tokenVerify(token_public)){

        const db=new Client(pgInit)
        db.connect((err)=>{
            console.log(err)    
        })

        const sql="UPDATE badonnaproject.board SET title=$2,contents=$3,address=$4,date=$5 WHERE board_num=$1 "
        const values=[board_number,board_title,board_contents,board_place,board_date]
        
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