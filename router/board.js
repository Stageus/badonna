const router=require("express").Router()
const path=require("path")
const pgInit=require("../module/psql")
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
    const board_is_end=req.body.is_end 
    const token_public=req.headers.token
    const board_date=moment()
    const join_member_count=req.body.join_count 
    const now_member_count=0

    const api_name="board" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_title,board_contents,board_place,user_id,board_date,join_member_count]
    const api_call_time=moment()
    
    
    const result={
        "success":false,
        "message":null
    } 
    try{

        if(board_title.length ==0 || board_title == null ){
            result.message="옳바르지 않은 제목 입력 입니다."
            res.send(result)
        }else if(board_contents.length == 0 || board_contents == null || board_contents.length >=200){
            result.message="옳바르지 않은 내용 입력 입니다."
            res.send(result)
        }else if(board_place.length == 0 || board_place == null){
            result.message="옳바르지 않은 주소 입력 입니다."
            res.send(result)
        }else if(user_id.length == 0 || user_id == null || user_id >=12){
            result.message="옳바르지 않은 아이디 입력 입니다."
            res.send(result)
        }else if(board_is_end.length == 0 || board_is_end == null || board_is_end !=0 && board_is_end !=1){
            result.message="옳바르지 않은 모집글 완료 입력 입니다."
            res.send(result)
        }else if(join_member_count.length == 0 || join_member_count == null){
            result.message="옳바르지 않은 총인원 수 입력 입니다."
            res.send(result)
        }
        else{

            if(tokenVerify(token_public)){//인증 완료 되면 

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err)
                        console.log(err)    
                })

                const sql="INSERT INTO badonnaproject.board(id,title,contents,place,date,is_end,join_count,now_count) VALUES($1,$2,$3,$4,$5,$6,$7,$8)"
                const values=[user_id, board_title,board_contents,board_place,board_date,board_is_end,join_member_count, now_member_count]
                db.query(sql,values,(err,row)=>{
                    if(!err){
                        result.success=true
                        result.message="성공"
                    }else{
                        console.log(err)
                    }
                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, row,api_call_time)
                    res.send(result)
                    db.end()
                })

            }else{
                result.message="잘못된 token!"
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
    //const board_number=req.query.board_num //처음 일 경우  없어도 되지 않을까?  
    //page 수만 주면 된다. 정렬 해서 보내기 vs offset에 board_num 넣어서 +1 증가 
    let temp=req.query.offset//fe 에서 넘겨 주는 page 수
    let temp_num=parseInt(temp)
    let offset_num=temp_num*10//offset 지정 해주기 위한 변수  0,10,20,30~
    
    const api_name="board" + req.url
    const req_host=req.headers.req_host
    const req_data=[temp]
    const api_call_time=moment()


    const result={
        "success":false,
        "data":null,
        "count":null,
        "message":null
    }

    try{
       
        if(temp_num.length == 0 || temp_num == null){
            result.message="옳바르지 않은 페이지 입력 입니다."
            res.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
                })

                

                const sql="SELECT * FROM badonnaproject.board ORDER BY date DESC LIMIT $1 OFFSET $2"
                //const sql="SELECT board.board_num ,title,contents,date,address, member_list FROM badonnaproject.board  INNER JOIN badonnaproject.member ON board.board_num = member.board_num ORDER BY date LIMIT $1 OFFSET $2"
                const values=[10,offset_num]
            
                db.query(sql,values,(err,row)=>{
                    if(!err){
        
                        for(let i=0; i<row.rows.length; i++){
                            const temp=row.rows[i].date 
                            row.rows[i].date=temp.toISOString().split("T")[0]
                        }
                        
                        result.data=row.rows
                        result.success=true
                        result.message="성공"
                        
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
        result.message="에러 입니다."
        res.send(result)
    }

})


router.delete("/",(req,res)=>{

    const token_public=req.headers.token
    const board_mumber=req.body.board_num 

    const api_name="board" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_mumber]
    const api_call_time=moment()
    const res_data=" "

    const result={
        "success":false,
        "message":null
    }

    try{
        if(board_mumber.length == 0 || board_mumber == null){
            result.message="옳바르지 않은 게시글 번호 입력 입니다."
            res.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
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
        result.message="잘 못된 입력 입니다."
        res.send(result)
    }

})


router.put("/",(req,res)=>{

    const token_public=req.headers.token
    const board_number=req.body.board_num 
    const board_title=req.body.title
    const board_contents=req.body.contents
    const board_place=req.body.place
    const board_date=moment()

    const api_name="board" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_number,board_title,board_contents,board_place,board_date]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }

    try{

        if(board_number == 0 || board_number == null){
            result.message="옳바르지 않은 게시번호 입력 입니다."
            res.send(result)
        }else if(board_title.length == 0 || board_title == null || board_title >=200){
            result.message="옳바르지 않은 제목 입력 입니다."
            res.send(result)
        }else if(board_contents.length == 0 || board_contents == null || board_contents >=200 ){
            result.message="옳바르지 않은 내용 입력 입니다."
            res.send(result)
        }else if(board_place.length == 0 || board_place == null ||board_place >500){
            result.message="옳바르지 않은 주소 입력 입니다."
            res.send(result)
        }else{
            if(tokenVerify(token_public)){

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }  
                })

                const sql="UPDATE badonnaproject.board SET title=$2,contents=$3,place=$4,date=$5 WHERE board_num=$1 "
                const values=[board_number,board_title,board_contents,board_place,board_date]
                
                db.query(sql,values,(err,row)=>{
                    if(!err){
                        result.success=true
                    }else{
                        console.log(err)
                    }
                    
                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, row,api_call_time)

                    res.send(result)
                    db.end()
                })
            }else{
                result.message="잘못된 token!"
                res.send(result)
            }
        }

    }catch(e){
        result.message="옳바르지 않은 입력 입니다."
        res.send(result)
    }


})


//모집 완료 버튼을 클릭 한 경우 호출 하는 api 

router.put("/is_end",(req,res)=>{
    
    const token_public=req.headers.token
    const board_is_end=req.body.is_end
    const board_number=req.body.board_num 


    const api_name="board" + req.url
    const req_host=req.headers.req_host
    const req_data=[temp]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }

    try{
        if(board_is_end.length ==0 || board_is_end == null || board_is_end !=1){
            result.message="옳바르지 않은 모집 완료 입력 입니다."
            res.send(result)
        }else if(board_number.length == 0 || board_number == null){
            result.message="옳바르지 않은 게시글 번호 입력 입니다."
            res.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }  
                })

                const sql="UPDATE badonnaproject.board SET is_end=$2 WHERE board_num=$1 "
                const values=[board_number,board_is_end]
                
                db.query(sql,values,(err,row)=>{
                    if(!err){
                        result.success=true
                    }else{
                        console.log(err)
                    }

                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, row.rows,api_call_time)

                    res.send(result)
                    db.end()
                })
            }else{
                result.message="잘못된 token!"
                res.send(result)
            }

        }

    }catch(e){
        result.message="에러 입니다."
        res.send(result)
    }

})

//승인 버튼 클릭시 호출 되는 aip 
router.post("/permission",(req,res)=>{//승인 버튼을 누를 때 마다 조인 하려고 하는 사람의 
    // id가 member table에 추가 된다.
    const token_public=req.headers.token 

    const board_member=req.body.board_num 
    const member_id=req.body.id
    const member_count=req.body.now_count 
   // const member_total_count=req.body.join_count 
    
    const api_name="board" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_member,member_id,member_count]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }

    try{

        if(board_member.length == 0 || board_member == null){
            result.message="옳바르지 않은 게시글 번호 입니다."
            res.send(result)
        }else if(member_id.length == 0 || member_id == null || member_id.length ==0){
            result.message="옳바르지 않은 맴버 아이디 입니다."
            res.send(result)
        }else{

            if(tokenVerify(token_public)){

                const db = new Client(pgInit)
                db.connect((err)=>{
                    if(err){
                        console.log(err)
                    }
                })

                const sql="UPDATE badonnaproject.board SET now_count=$2 member_list=$3 WHERE board_num=$1"
                const values=[board_member,member_count,member_id]
                
                db.query(sql,values,(err,row)=>{

                    if(!err){
                        result.success=true
                        result.message="성공"
                    }else{
                        console.log(err)
                    }
                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)

                    res.send(result)
                    db.end()
                    
                })

            }else{
                result.message="잘 못된 token"
                res.send(result)
            }
        }

    }catch(e){
        result.message="에러 입니다."
        res.send(result)
    }

})

//모집 글에 참여한 사람의 id를 조회 하는 api 

router.get("/members",(req,res)=>{

    const token_public=req.headers.token 
    const board_member=req.query.board_num 

    const api_name="member" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_member]
    const api_call_time=moment()

    const result={
        "success":false,
        "data":null,
        "message":null
    }

    try{
        if(board_member.length ==0 || board_member == null){
            result.message="옳바르지 않은 게시글 번호 입니다."
            res.send(result)
        }

            if(tokenVerify(token_public)){

                const db = new Client(pgInit)
                db.connect((err)=>{
                    if(err){
                        console.log(err)
                    }
                })

                const sql="SELECT member_list FROM badonnaproject.board WHERE board_num=$1"
                const values=[board_member]
                
                db.query(sql,values,(err,row)=>{

                    if(!err){
                        result.success=true
                        result.data=row.rows[0]
                    }else{
                        console.log(err)
                    }
                    //로깅 남기기
                    logFuntion(api_name,req_host, req_data, result.data,api_call_time)

                    res.send(result)
                    db.end()
                    
                })

            } 

    }catch(e){
        result.message="에러 입니다."
        res.send(result)
    }

})


module.exports=router