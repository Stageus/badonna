const router=require("express").Router()
const path=require("path")
require("dotenv").config()
const logFuntion=require("../module/logging")
const moment=require("../module/moment")
const tokenVerify=require("../module/verify")
const jwt=require("jsonwebtoken")
const axios=require("axios")

router.post("/",(req,res)=>{

    const phone_num=req.body.phonenum
    const user_name=req.body.name

    const result={
        "success":false,
        "message":null,
    }

    axios({
        method: method,
        // request는 uri였지만 axios는 url이다
        url: "https://sens.apigw.ntruss.com/sms/v2/services/{serviceId}/messages",
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        // request는 body였지만 axios는 data다
        data: {
            type: "SMS",
            countryCode: "82",
            from: my_number,
            // 원하는 메세지 내용
            content: `${user_name}님 인증 완료 감사합니다.`,
            messages: [
            // 신청자의 전화번호_사용자 전화 번호
                { to: `${phone_num}`, },],
        },
    }).then(res => {
        console.log(res.data)
        
        if(res.data.statusCode == '202'){
            result.success=true
            res.send(result)
        }else{
            result.message=res.data.statusCode
            res.send(result)
        }
    })

})

module.exports = router
