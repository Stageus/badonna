const router=require("express").Router()
const path=require("path")
const pgInit=require("../module/psql")
const {Client}=require("pg")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")
const jwt=require("jsonwebtoken")

const secretKey=process.env.TOKEN_SCREAT_KEY

router.post("/login",(req,res)=>{

   const idValue=req.body.id
   const pwValue=req.body.pw

   const api_name="account" + req.url
   const req_host=req.headers.req_host
   const req_data=[idValue,pwValue]
   const api_call_time=moment()

    const result={
        "success":false,
        "message":null,
        "token":null,
    }
    //여기에 예외처리를 하고 res.send()를 바로 해주면 된다. 
    //여기 서 부터 try가 시작 하고 그외  undifined || null  datatype and length check  원하는 데이터 형식 인지 해주기 
    // 서버가 터질 일이 없다.
    //예외 처리 상황에 대하여 Front -end 에게 정확하게 메세지 보내주기  "한글로 보내기"
    
    //db 연결
    try{

        if(idValue !=null || idValue.length !=0 || pwValue!=null || pwValue.length !=0) {
            if(idValue.length >12 || pwValue.length >16){
                throw (err)
            }else{

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
                })
        
                const sql="SELECT * FROM  badonnaproject.account WHERE id=$1 and pw=$2"
                const values=[idValue,pwValue]
                // console.log(values)
                db.query(sql,values,(err,data)=>{
                    if(!err){
            
                        const row=data.rows;
                        if(row.length == 0){
                            throw (err)
                        }else{
                            const jwtToken=jwt.sign(
                                {
                                    "id":idValue,//로그인 한 사람의 아이디
                                    "pw":pwValue
                                },
                                secretKey,
                                {
                                    "issuer": "kelly",// 발급자 메모용
                                    "expiresIn":"24h" //토큰 완료 시간
                                }
                            )
                            console.log("token",jwtToken)
                            result.token=jwtToken
                            result.success=true
                            
                        }
            
                        //loggin 
                        logFuntion(api_name,req_host, req_data, data.rows[0],api_call_time)
                    }
                   
                    res.send(result)
                    db.end()
            
                })

            }
        }else{
            throw (err)
        }    
            
    }catch(err){
        result.message="아이디 비밀번호를 확인해주세요"
        res.send(result)
    }

})
    

//회원 가입

router.post("/",(req,res)=>{

    const idValue=req.body.id
    const pwValue=req.body.pw
    const user_name=req.body.name
    const user_phone=req.body.phonenum
    const join_date=moment()
 
    console.log(idValue,pwValue,user_name,user_phone,join_date)
    const api_name="account" + req.url
    const req_host=req.headers.req_host
    const req_data=[idValue,pwValue,user_name,user_phone,join_date]
    const api_call_time=moment()

    

    const result={
        "success":false,
        "message":null
    }

    try{
        
       
        if(idValue == null || idValue.length >=12 || idValue.length <6){
            result.message="옳바르지 않은 아이디 입력 입니다."
            res.send(result)
        }else if(pwValue == null || pwValue.length >=16 || pwValue.length <6){
            result.message="옳바르지 않은 비밀번호 입력 입니다."
            res.send(result)
        }else if(user_name == null || user_name.length > 4 && user_name.length <2){
            result.message="옳바르지 않은 이름 입력 입니다."
            res.send(result)
        }else if(user_phone.length == 0 || user_phone == null || user_phone.length != 13 ){
            result.message="옳바르지 않은 전화번호 입력 입니다."
            res.send(result)
        }else{ 
            const db=new Client(pgInit)
            db.connect((err)=>{
                if(err)
                    console.log("db connect",err)
            })

            const sql="INSERT INTO badonnaproject.account(id,pw,name, phonenum,date) VALUES($1,$2,$3,$4,$5)"
            const values=[idValue,pwValue,user_name,user_phone,join_date]
            db.query(sql,values,(err,data)=>{
                if(!err){
                    result.success=true
                }else{
                    console.log(err)
                }

                //logging 
                logFuntion(api_name,req_host, req_data, data.rows[0],api_call_time)
                
                res.send(result)
                db.end()
            })

            
        }
    }catch(e){
        result.message="에러 입니다."
        res.send(result)
    }

})


router.get("/",(req,res)=>{

    const idValue=req.query.id 
    const token_public=req.headers.token
     
    const api_name="account" + req.url
    const req_host=req.headers.req_host
    const req_data=[idValue]
    const api_call_time=moment()

    const result={
        "success":false,
		"data":null,
        "message":null
    }
    console.log(idValue)
    console.log(token_public)
    try{

        if(idValue.length ==0 || idValue == null || idValue.length >=12){
            result.message="아이디 입력이 잘 못 되었습니다."
            res.send(result)
        }else{
        
            //token verify 
            if(tokenVerify(token_public)){

                const db=new Client(pgInit)
                db.connect((err)=>{
                    if(err) {
                        console.log(err)
                    }
                })

                const sql="SELECT badonnaproject.account.id, name, place, phonenum FROM  badonnaproject.account JOIN badonnaproject.place ON badonnaproject.account.id=$1 AND badonnaproject.place.id=$1 "
                const values=[idValue]
                db.query(sql,values,(err,row)=>{
                    if(!err){
                        if(row.rows.length == 0){
                            result.message="회원이 아닙니다."
                        }else{
                            result.data=row.rows[0]
                            result.success=true
                        }
                    }else{
                        console.log(err)
                    }
                    
                    //logging

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

//중복 아이디 체크 
router.post("/duplicate/id",(req,res)=>{

    const idValue=req.body.id

    const api_name="account" + req.url
    const req_host=req.headers.req_host
    const req_data=[idValue]
    const api_call_time=moment()

    const result={
        "success":false,
        "message":null
    }
    
    try{
        
        if(idValue.length ==0 || idValue == null || idValue.length >=12){
            result.message="아이디 입력이 잘 못 되었습니다."
            res.send(result)
        }else{
            //db 연결
            const db=new Client(pgInit)
            db.connect((err)=>{
                if(err) {
                    console.log(err)
                }
            })
        
            const sql="SELECT * FROM  badonnaproject.account WHERE id=$1"
            const values=[idValue]

            db.query(sql,values,(err,data)=>{
                if(!err){
                    const row=data.rows
                    if(row.length ==0){
                        result.success=false
                    }else{
                        if(row[0].id == idValue){
                            result.success=true
                        }
        
                    }
                }

                //loggin 
                logFuntion(api_name,req_host, req_data, data.rows[0],api_call_time)

                res.send(result)
                db.end()
            })
        }

    }catch(e){
        result.message="에러 입니다. "
        res.send(result)
    }

})


module.exports=router