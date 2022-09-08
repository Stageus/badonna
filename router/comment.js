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
    const comment_contents=req.body.contents
    const user_name=req.body.id
    
    const api_name="comment" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_member,comment_contents,user_name]
    const api_call_time=moment()
    
    const result={
        "success":false,
        "message":null
    }
    
    try{
        if(comment_contents.length ==0 || comment_contents ==null || comment_contents >200){
            result.message="옳바르지 않은 내용 입력 입니다. "
            res.send(result)
        }else if(board_member.length ==0 || board_member == null){
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

                const sql="INSERT INTO badonnaproject.comment(board_num,comment_contents,comment_id) VALUES($1,$2,$3)"
                const values=[board_member,comment_contents,user_name]
                
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
        result.message="에러 입니다."
        res.send(result)
    }


})

router.get("/",(req,res)=>{

    //token id로 검증 해서 token id와  게시글 쓴 사람의 id 가 같은 경우 보내 주기 
    const token_public=req.headers.token 
    const comment_number=req.query.board_num
    const idValue=req.query.id
    
    const api_name="comment" + req.url
    const req_host=req.headers.req_host
    const req_data=[comment_number,idValue]
    const api_call_time=moment()

    const result={
        "success":false,
        "data":null,
        "secret_data":null,
        "message":null
    }

    try{
        if(comment_number.length ==0 || comment_number == null){
            result.message="옳바르지 않은 게시글 번호 입니다. "
            res.send(result)
        }else if(idValue.length == 0 || idValue == null || idValue >=12){
            result.message="옳바르지 않은 아이디 번호 입니다. "
            res.send(result)
        }else{
            
            const db=new Client(pgInit)
            db.connect((err)=>{
                if(err) {
                    console.log(err)
                }
            })

            if(tokenVerify(token_public)){

                const token_id=tokenId(token_public)
                if(token_id == idValue){//token id 와 게시글 작성 한 사람이 같은 경우
                   // const sql="SELECT * FROM badonnaproject.comment JOIN badonnaproject.reply ON badonnaproject.comment.board_num = badonnaproject.reply.board_num  AND  badonnaproject.comment.comment_num = badonnaproject.reply.comment_num  WHERE badonnaproject.comment.comment_id =$1"
                   
                   const sql="SELECT * FROM  badonnaproject.comment WHERE board_num=$1 AND comment_id=$2"
                   const values=[comment_number,idValue]

                    db.query(sql,values,(err,row)=>{
                        if(!err){
                            result.data=row.rows// row가 어떤 것이 반환이 되는 지 확인 하기 
                            result.success=true
                        }else{
                            console.log(err)
                        }

                        //로깅 남기기
                        logFuntion(api_name,req_host, req_data, row.rows,api_call_time)

                        //res.send(result)
                        //db.end()

                    })
                }
                
                const sql2="SELECT * FROM  badonnaproject.comment WHERE comment_id != $2 AND board_num=$1"
                const values2=[comment_number,idValue]

                db.query(sql2,values2,(err,row)=>{
                    if(!err){
                        const temp_data=row.rows// row가 어떤 것이 반환이 되는 지 확인 하기 
                        for(let i=0; i<row.rows.length; i++){
                            temp_data[i].comment_contents="비밀 댓글"
                        }
                        result.secret_data=temp_data
                    }else{
                        console.log(err)
                    }

                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, row.rows,api_call_time)
                    
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



router.put("/",(req,res)=>{

    const token_public=req.headers.token 
    const comment_number=req.body.comment_num 
    const comment_contents=req.body.contents 

    const api_name="comment" + req.url
    const req_host=req.headers.req_host
    const req_data=[comment_number,comment_contents]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }
    
    try {

        if(comment_number.length == 0 || comment_number == null ){
            result.message="옳바르지 않은 댓글 번호 입니다."
            res.send(result)
        }else if(comment_contents.length == 0 || comment_contents == null || comment_contents >200){
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

                const sql="UPDATE badonnaproject.comment SET comment_contents=$2 WHERE comment_num=$1 "
                const values=[comment_number,comment_contents]
                
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
    const comment_number=req.body.comment_num 

    const api_name="comment" + req.url
    const req_host=req.headers.req_host
    const req_data=[comment_number]
    const api_call_time=moment()
    const res_data=" "

    const result={
        "success":false
    }

    try{
        if(comment_number.length == 0 || comment_number == null){
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

                const sql="DELETE FROM badonnaproject.comment WHERE comment_num=$1;"
                const values=[comment_number]
                
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