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
import isLogin from "../../Module/isLogin"
import { getCookie } from "../../Module/cookie"
import { useSelector } from "react-redux"

const Main = () => {

    const topbarState = useSelector(state => state.login.topbar)

    return (
        <Routes>
            <Route path = "/*" element = {<HomePage />}/>
            <Route path = "/login" element = {<LoginPage/>}/>
            <Route path = "/join" element = {<JoinPage />}/>
            <Route path = "/board" element = {<BoardPage />}/>
            <Route path = "/profile" element = { 
                topbarState === true?
                <ProfilePage/> : 
                <Navigate replace to = "/login"/>}
            />
            <Route path = "/comment" element = {
                topbarState === true?
                <CommentPage/> :
                <Navigate replace to = "/login"/>}
            />
            <Route path = "/boardWrite" element = {
                topbarState === true?
                <BoardWritePage/> :
                <Navigate replace to = "/login"/>}
            />
            <Route path = "/termsOfService" element = {<TermsOfService />}/>
        </Routes>
    )
}

export default Main