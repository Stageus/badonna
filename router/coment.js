const router=require("express").Router() 
const path=require("path")
const pgInit=require("../module/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")
const tokenId=require("../module/token_id_info")

router.post("/",(req,res)=>{

    const token_public=req.headers.token 
    const board_member=req.body.board_num 
    const coment_contents=req.body.contents
    
    const api_name="coment" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_member,coment_contents]
    const api_call_time=moment()
    
    const result={
        "success":false,
        "message":null
    }
    
    try{
        if(coment_contents.length ==0 || coment_contents ==null || coment_contents >200){
            result.message="옳바르지 않은 내용 입력 입니다. "
            res.send(result)
        }else if(board_member.length ==0 || board_member == null || Number.isInteger(board_member)){
            result.message="옯바르지 않은 게시글 번호 입력 입니다."
            res.send(result)
        }else{
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
                    logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                    res.send(result)
                    db.end()
                    
                })

            }else{
                result.message="잘 못된 token!"
                res.send(result)
            }
        }

    }catch(e){
        result.message="옯바르지 않은 입력 입니다."
        res.send(result)
    }


})

router.get("/",(req,res)=>{

    //token id로 검증 해서 token id와  게시글 쓴 사람의 id 가 같은 경우 보내 주기 
    const token_public=req.headers.token 
    const coment_number=req.query.board_num
    const idValue=req.query.id

    const api_name="coment" + req.url
    const req_host=req.headers.req_host
    const req_data=[coment_number,idValue]
    const api_call_time=moment()

    const result={
        "success":false,
        "data":null,
        "message":null
    }

    try{
        if(coment_number.length ==0 || coment_number == null || Number.isInteger(coment_number)){
            result.message="옳바르지 않은 댓글 번호 입니다. "
            res.send(result)
        }else if(idValue.length == 0 || idValue == null || idValue >=12){
            result.message="옳바르지 않은 아이디 번호 입니다. "
            res.send(result)
        }else{

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
                        logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                        res.send(result)
                        db.end()
                        
                    })
                }else{
                    result.data="댓글을 볼 수없습니다."
                    res.send(result)
                }
            }else{
                result.message="잘 못된 token!"
                res.send(result)
            }
        }

    }catch(e){
        result.message="옳바르지 않은 입력 입니다. "
        res.send(result)
    }

   
})



router.put("/",(req,res)=>{

    const token_public=req.headers.token 
    const coment_number=req.body.coment_num 
    const coment_contents=req.body.contents 

    const api_name="coment" + req.url
    const req_host=req.headers.req_host
    const req_data=[coment_number,coment_contents]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }
    
    try {

        if(coment_number.length == 0 || coment_number == null || Number.isInteger(coment_number)){
            result.message="옳바르지 않은 댓글 번호 입니다."
            res.send(result)
        }else if(coment_contents.length == 0 || coment_contents == null || coment_contents >200){
            result.message="옳바르지 않은 댓글 내용 입니다."
            res.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
                })

                const sql="UPDATE badonnaproject.coment SET contents=$2 WHERE coment_num=$1 "
                const values=[coment_number,coment_contents]
                
                db.query(sql,values,(err,row)=>{
                    if(!err){
                        result.success=true
                    }else{
                        console.log(err)
                    }

                    ///로깅 남기기
                    logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                    res.send(result)
                    db.end()
                })
            }else{
                result.message="잘 못된 token!"
                res.send(result)
            }
        }
        
    }catch(e){
        result.message="옳바르지 않은 입력 입니다."
        res.send(result)

    }
})


router.delete("/",(req,res)=>{
    const token_public=req.headers.token 
    const coment_number=req.body.coment_num 

    const api_name="coment" + req.url
    const req_host=req.headers.req_host
    const req_data=[coment_number]
    const api_call_time=moment()
    const res_data=" "

    const result={
        "success":false
    }

    try{
        if(coment_number.length == 0 || coment_number == null || Number.isInteger(coment_number)){
            result.message="옳바르지 않은 댓글 번호 입니다."
            res.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db = new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
                })

                const sql="DELETE FROM badonnaproject.coment WHERE coment_num=$1;"
                const values=[coment_number]
                
                db.query(sql,values,(err,row)=>{

                    if(!err){
                        result.success=true
                    }else{
                        console.log(err)
                    }
                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, res_data,api_call_time)
                    
                    res.send(result)
                    db.end()
                    
                })

            }else{
                result.message="잘 못된 token!"
                res.send(result)
            }
        }

    }catch(e){
        result.message="에러 입니다. "
        res.send(result)
    }

})



module.exports=router