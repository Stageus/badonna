const router=require("express").Router() 
const path=require("path")
const pgInit=require("../database/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")
const tokenId=require("../module/token_id_info")

router.post("/",(req,res)=>{

    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const board_member=req.body.board_num 
    const coment_contents=req.body.contents 
    
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

        const sql="INSERT INTO badonnaproject.coment(board_num,contents) VALUES($1,$2)"
        const values=[board_member,coment_contents]
        
        db.query(sql,values,(err,row)=>{

            if(!err){
                result.success=true
            }else{
                console.log(err)
            }
            //로깅 남기기
            //logFuntion(user_id, api_name,req_host,api_call_time)
            // id ip, input output api_name 5개는 필수 이다. 

            res.send(result)
            db.end()
            
        })

    }


})

router.get("/",(req,res)=>{

    //token id로 검증 해서 token id와  게시글 쓴 사람의 id 가 같은 경우 보내 주기 
    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const coment_number=req.query.board_num
    const idValue=req.query.id

    const result={
        "success":false,
        "data":null
    }

    if(tokenVerify(token_public)){

        const token_id=tokenId(token_public)

        if(token_id == idValue){//token id 와 게시글 작성 한 사람이 같은 경우

            const db=new Client(pgInit)
            db.connect((err)=>{
                if(err) {
                    console.log(err)
                }
            })

            const sql="SELECT contents FROM badonnaproject.coment WHERE board_num=$1"
            const values=[coment_number]

            db.query(sql,values,(err,row)=>{
                if(!err){
                    result.data=row.rows// row가 어떤 것이 반환이 되는 지 확인 하기 
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
            result.data="비밀 댓글"
            res.send(result)
        }
    }

   
   
})



router.put("/",(req,res)=>{

    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const coment_member=req.body.coment_num 
    const coment_contents=req.body.contents 

    const result={
        "success":false
    }

    if(tokenVerify(token_public)){

        const db=new Client(pgInit)
        db.connect((err)=>{
            if(err) {
                console.log(err)
            }
        })

        const sql="UPDATE badonnaproject.coment SET contents=$2 WHERE coment_num=$1 "
        const values=[coment_member,coment_contents]
        
        db.query(sql,values,(err,row)=>{
            if(!err){
                result.success=true
            }else{
                console.log(err)
            }

            //로깅 남기기
            //logFuntion(user_id, api_name,req_host,api_call_time)
            //로깅 남길 때 user_id 가 꼭 필오 할까? 
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

    const coment_member=req.body.coment_num 
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

        const sql="DELETE FROM badonnaproject.coment WHERE coment_num=$1;"
        const values=[coment_member]
        
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