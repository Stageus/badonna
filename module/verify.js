
const jwt=require("jsonwebtoken")
require("dotenv").config()

const secretKey=process.env.TOKEN_SCREAT_KEY

const token_verify=(pulbic_key)=>{

    let success =false
    try{
        jwt.verify(pulbic_key,secretKey)//서버가 가지고 있는 secretKey로 검증한다.
        success=true
    }catch(e){
        success=false
        console.log(e)
    }

    return success
}

module.exports=token_verify
