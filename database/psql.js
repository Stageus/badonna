
const router=require("express").Router()
const path=require("path")
require("dotenv").config()

const pgInit = {
    user: process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    host:process.env.PG_HOST,
    database: process.env.PG_DATABASES,
    prot: process.env.PG_PROT
}


module.exports=pgInit