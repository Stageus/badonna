const router=require("express").Router()
const path=require("path")
const pgInit=require("../module/psql")
const {Client}=require("pg")

const nowCount =(board_number)=>{

    const success=false 

    const db=new Client(pgInit)
    db.connect((err)=>{
        if(err) {
            console.log(err)
        }
    })

    const sql="INSERT INTO badonnaproject.member(board_num,now_members) VALUES($1,$2)"
    const values=[board_number,0]
    // console.log(values)
    db.query(sql,values,(err,data)=>{
        if(!err){
            success=true
        }
       db.end()
    })

    return success
}


module.exports=nowCount