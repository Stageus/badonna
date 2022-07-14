
const router=require("express").Router()
const path=require("path")
require("dotenv").config()

const pg_user=process.env.PG_USER
const pg_pasword=process.env.PG_PASSWORD
const pg_host=process.env.PG_HOST
const pg_database=process.env.PG_DATABASES
const pg_prot=process.env.PG_PROT

const pgInit = {
    user: pg_user,
    password:pg_pasword,
    host:pg_host,
    database: pg_database,
    prot: pg_prot
}