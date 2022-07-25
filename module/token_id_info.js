const jwt=require("jsonwebtoken")
require("dotenv").config()

const tokenId=(token_public)=>{//palyoad: 
    //token_public을 역 hash를 해서 json 으로 접근 하기 

    const base64Payload = token_public.split('.')[1]
    const  payload = Buffer.from(base64Payload, 'base64')
    const result = JSON.parse(payload.toString())

    return result.id
}


module.exports=tokenId