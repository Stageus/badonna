const jwt=require("jsonwebtoken")
require("dotenv").config()

const tokenId=(token_public)=>{

    const base64Payload = token_public.split('.')[1]
    const  payload = Buffer.from(base64Payload, 'base64')
    const result = JSON.parse(payload.toString())

    return result.id
}


module.exports=tokenId