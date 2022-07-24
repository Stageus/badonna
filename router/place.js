const router=require("express").Router() 
const path=require("path")
const pgInit=require("../module/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")

router.post("/",(req,res)=>{

    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const user_id=req.body.id 
    const user_place=req.body.place
    const result={
        "success":false,
        "message":null
    }

    if(user_place.length !=0){

        if(tokenVerify(token_public)){

            const db = new Client(pgInit)
            db.connect((err)=>{
                if(err) {
                    console.log(err)
                }
            })
            const sql="INSERT INTO badonnaproject.place(id,place) VALUES($1,$2)"
            const values=[user_id,user_place]
            
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
        }
    }else{
        result.message="장소 입력 실패"
        res.send(result)
    }
})


router.get("/",(req,res)=>{
    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const user_id=req.body.id 
    const result={
        "success":false,
        "data":null
    }
    if(tokenVerify(token_public)){

        const db = new Client(pgInit)
        db.connect((err)=>{
            if(err) {
                console.log(err)
            }
        })
        const sql="SELECT * FROM  badonnaproject.place WHERE id=$1"
        const values=[user_id]
        
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


router.delete("/",(req,res)=>{
    const token_public=req.headers.token 
    const api_name=req.url
    const req_host=req.headers.req_host
    const api_call_time=moment()

    const place_number=req.body.place_num
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

        const sql="DELETE FROM badonnaproject.place WHERE place_num=$1"
        const values=[place_number]
        
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