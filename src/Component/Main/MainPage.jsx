import React from "react"
import style from "./SCSS/Main.module.scss"
import LoginPage from "./LoginPage"
import JoinPage from "./JoinPage"
import BoardPage from "./BoardPage"
import ProfilePage from "./ProfilePage"
import BoardWritePage from "./BoardWritePage"
import CommentPage from "./CommentPage"
import HomePage from "./HomePage"
import TermsOfService from "./TermsOfService"
import { Routes, Route, Navigate } from "react-router-dom"
import Test from "./Test"
import isLogin from "../../Module/isLogin"
import { getCookie } from "../../Module/cookie"

const Main = () => {
    return (
        <Routes>
            <Route path = "/*" element = {<HomePage />}/>
            <Route path = "/login" element = {<LoginPage/>}/>
            <Route path = "/join" element = {<JoinPage />}/>
            <Route path = "/board" element = {<BoardPage />}/>
            <Route path = "/profile" element = { 
                isLogin(getCookie("access-token"))?
                <ProfilePage/> : 
                <Navigate replace to = "/login"/>}
            />
            <Route path = {`board:boardNum/comment`} element = {
                isLogin(getCookie("access-token"))?
                <CommentPage/> :
                <Navigate replace to = "/login"/>}
            />
            <Route path = "/board/boardWrite" element = {
                isLogin(getCookie("access-token"))?
                <BoardWritePage/> :
                <Navigate replace to = "/login"/>}
            />
            <Route path = "/termsOfService" element = {<TermsOfService />}/>
        </Routes>
    )
}

export default Main