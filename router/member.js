const router=require("express").Router() 
const path=require("path")
const pgInit=require("../module/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")
const tokenId=require("../module/token_id_info")


//승인 버튼 클릭시 호출 되는 api 
//승인 버튼 클릭 시 그냥 count 증가만 하면 되는지?__ count 를 psql에 저장 하는 이유가 보안 문제(예: 조인 하고 음식 가지러 
//나가지 안는다든지, 음식만 받고 돈을 주지 않는다던지 이런 것을 방지 하기 위해  저장 하는 것이므로 
//count 증가하면서 이 참여 한 사람의 정보도 저장 해야 하지 않나? -- > id(pk 조인한 사람의) 정보 array로 저장 하기

// 저장 한다면 어떤 식으로?? 
router.post("/permission",(req,res)=>{//승인 버튼을 누를 때 마다 조인 하려고 하는 사람의 
    // id가 member table에 추가 된다.
    const token_public=req.headers.token 
    const board_member=req.body.board_num 
    const member_id=req.body.id

    const api_name="member" + req.url
    const req_host=req.headers.req_host
    const req_data=[board_member,member_id]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }

    try{

        if(board_member.length == 0 || board_member == null){
            result.message="옳바르지 않은 게시글 번호 입니다."
            res.send(result)
        }else if(member_id.length == 0 || member_id == null ||member_id >12){
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

                const sql="INSERT INTO badonnaproject.member(board_num,member_list) VALUES($1,$2)"
                const values=[board_member,member_id]
                
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



router.get("/",(req,res)=>{
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

                const sql="SELECT member_list FROM badonnaproject.member WHERE board_num=$1"
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