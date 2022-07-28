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
    const board_date=req.body.date 

    const token_public=req.headers.token

    const api_name="board" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_title,board_contents,board_place,user_id,board_date]
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
        }else if(board_date.length != 8 || board_date == null){
            result.message="옳바르지 않은 날짜 입력 입니다."
            res.send(result)
        }else if(user_id.length == 0 || user_id == null || user_id >=12){
            result.message="옳바르지 않은 아이디 입력 입니다."
            res.send(result)
        }else{

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
                    logFuntion(api_name,req_host, req_data, row.rows[0],api_call_time)


                    res.send(result)
                    db.end()
                })

            }else{
                result.message="잘못된 token!"
                res.send(result)
            }

        }
    }catch(e){
        result.message="잘못된 입력 입니다."
        res.send(result)
    }



})


router.get("/",(req,res)=>{

    const token_public=req.headers.token
    // const board_number=req.query.board_num //처음 일 경우  없어도 되지 않을까?  page 수만 주면 된다. 정렬 해서 보내기
    let temp=req.query.offset
    let temp_num=parseInt(temp)
    let offset_num=temp_num*10//offset 지정 해주기 위한 변수 
   
    console.log(temp_num )
    
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

                //const sql="SELECT board_num, title, contents, date, address, member_list FROM badonnaproject.board JOIN badonnaproject.member ORDER BY date DESC LIMIT $1 OFFSET $2"
                const sql="SELECT board.board_num ,title,contents,date,address, member_list FROM badonnaproject.board  INNER JOIN badonnaproject.member ON board.board_num = member.board_num ORDER BY date LIMIT $1 OFFSET $2;"
                const values=[10,offset_num]
            
                db.query(sql,values,(err,row)=>{
                    if(!err){
                    
                        for(let i = 0; i<row.rows.length; i++){
                            result.count=row.rows[i].member_list.length
                            delete row.rows[i].member_list
                        }
                        result.data=row.rows// row가 어떤 것이 반환이 되는 지 확인 하기 
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
    const board_date=req.body.date

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
        }else if(board_date.length !=8 || board_date == null){
            result.message="옳바르지 않은 날짜 입력 입니다."
            res.send(result)
        }else{
            if(tokenVerify(token_public)){

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }  
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
        result.message="옳바르지 않은 입력 입니다."
        res.send(result)
    }


})


module.exports=router