const router=require("express").Router()
const path=require("path")
const pgInit=require("../module/psql")
const {Client}=require("pg")

const nowCount =()=>{

    const member_count = 0

    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err) {
            console.log(err)
        }
    })

    const sql="SELECT now_members FROM  badonnaproject.member"
    const values=[board_number]
    // console.log(values)
    db.query(sql,values,(err,data)=>{
        if(!err){
            if(data.rows.length == 0){
                console.log("data",data)
                return member_count
            }else{
                console.log("data",data)
                return member_count=1
            }
        }

    })
}


module.exports=nowCount