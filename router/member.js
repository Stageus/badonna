const router=require("express").Router() 
const path=require("path")
const pgInit=require("../database/psql")
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
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const board_member=req.body.board_num 
    const member_id=req.body.id

    const result={
        "success":false
    }

    if(tokenVerify(token_public)){

        const db = new Client(pgInit)
        db.connect((err)=>{
            console.log(err)
        })

        const sql="INSERT INTO badonnaproject.member(board_num,member_list) VALUES($1,$2)"
        const values=[]
        
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


router.get("/",(req,res)=>{
    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const board_member=req.query.board_num 

    const result={
        "success":false,
        "data":null
    }

    if(tokenVerify(token_public)){

        const db = new Client(pgInit)
        db.connect((err)=>{
            console.log(err)
        })

        const sql="SELECT member_list FROM badonnaproject.member board_num=1$"
        const values=[board_member]
        
        db.query(sql,values,(err,row)=>{

            if(!err){
                result.success=true
                result.data=row.rows
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