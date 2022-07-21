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
            console.log(err)
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
                console.log(err)
            })

            const sql="SELECT contents FROM badonnaproject.coment WHERE coment_num=$1"
            const values=[coment_number]

            db.query(sql,values,(err,row)=>{
                if(!err){
                    result.data=row// row가 어떤 것이 반환이 되는 지 확인 하기 
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
            console.log(err)    
        })

        const sql="UPDATE badonnaproject.coment SET contents=2$ WHERE coment_num=1$ "
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
            console.log(err)
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

//승인 버튼 클릭시 호출 되는 api 
//승인 버튼 클릭 시 그냥 count 증가만 하면 되는지?__ count 를 psql에 저장 하는 이유가 보안 문제(예: 조인 하고 음식 가지러 
//나가지 안는다든지, 음식만 받고 돈을 주지 않는다던지 이런 것을 방지 하기 위해  저장 하는 것이므로 
//count 증가하면서 이 참여 한 사람의 정보도 저장 해야 하지 않나? -- > id(pk 조인한 사람의)

// 저장 한다면 어떤 식으로?? 
router.post("/permission",(req,res)=>{

    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const coment_member=req.body.coment_num 
    const count=0

    const result={
        "success":false
    }

    if(tokenVerify(token_public)){

        const db = new Client(pgInit)
        db.connect((err)=>{
            console.log(err)
        })

        const sql="INSERT INTO badonnaproject.member() VALUES($1,$2)"
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

module.exports=router