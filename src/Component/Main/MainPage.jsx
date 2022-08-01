import React from "react"
import style from "./SCSS/Main.module.scss"
import { useSelector } from "react-redux"
import LoginPage from "./LoginPage"
import JoinPage from "./JoinPage"
import BoardPage from "./BoardPage"
import ProfilePage from "./ProfilePage"
import BoardWritePage from "./BoardWritePage"
import CommentPage from "./CommentPage"
import HomePage from "./HomePage"
import TermsOfService from "./TermsOfService"
import { Routes, Route } from "react-router-dom"

const Main = () => {

    const currentConState = useSelector(state => state.currentCon)
    const termsOfServiceState = useSelector(state => state.termsOfService)
    console.log(termsOfServiceState)

    if(currentConState){
        return (
            <Routes>
                <Route path = "/" element = {<HomePage />}/>
                <Route path = "/login" element = {<LoginPage />}/>
                <Route path = "/join" element = {<JoinPage />}/>
                <Route path = "/board" element = {<BoardPage />}/>
                <Route path = "/profile" element = {<ProfilePage />}/>
                <Route path = {`board:boardNum/comment`} element = {<CommentPage />}/>
                <Route path = "/board/boardWrite" element = {<BoardWritePage />}/>
                <Route path = "/termsOfService" element = {<TermsOfService />}/>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path = "/" element = {<HomePage />}/>
            <Route path = "/login" element = {<LoginPage />}/>
            <Route path = "/join" element = {<JoinPage />}/>
            <Route path = "/board" element = {<BoardPage />}/>
            <Route path = "/profile" element = {<ProfilePage />}/>
            <Route path = {`/comment/:boardNum`} element = {<CommentPage />}/>
            <Route path = "/boardWrite" element = {<BoardWritePage />}/>
        </Routes>
    )
}

export default Main