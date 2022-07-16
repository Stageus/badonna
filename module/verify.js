
const jwt=require("jsonwebtoken")
require("dotenv").config()

const secretKey=process.env.TOKEN_SCREAT_KEY

const token_verify=(pulbic_key)=>{

    const result={
        "success":false,
        "message":null
    }

    try{
        jwt.verify(tokenValue,secretKey)//서버가 가지고 있는 secretKey로 검증한다.
        result.success=true
        res.send(result)
    }catch(e){
        result.message="토큰이 잘못 됬음"
    }

    return result
}

module.exports=token_verify
