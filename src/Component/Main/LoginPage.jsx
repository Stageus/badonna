import React from "react"
import style from "./SCSS/Login.module.scss"
import Button from "../Common/Button"
import H1 from "../Common/H1"
import P from "../Common/P"
import Text from "../Common/Text"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Login = () => {

    const idCheck = useSelector(state => state.login.idCheck)
    const pwCheck = useSelector(state => state.login.pwCheck)

    return (
        <main id = {style.main}>
            <div id = {style.login}>
                <div id = "id">
                    <H1 text = "아이디"/>
                    <Text name = "loginId"/>
                    {
                        idCheck || idCheck === null ?
                        <P/> :
                        <P text = "아이디를 입력 해주세요."/>
                    }
                </div>
                <div pw = "pw">
                    <H1 text = "비밀번호"/>
                    <Text name = "loginPw" password/>
                    {
                        pwCheck || pwCheck === null ?
                        <P/> :
                        <P text = "비밀번호를 입력 해주세요."/>
                    }
                </div>
                <div id = {style.buttonBox}>
                    {
                        idCheck && pwCheck ?
                        <Link id = {style.loginButton} to = "/">
                            <Button text = "로그인" name = "login"/>
                        </Link> :
                        <a id = {style.loginButton}>
                            <Button text = "로그인" name = "login"/>
                        </a>
                    }
                    <Link id = {style.join} to = "/termsOfService">회원가입</Link>
                </div>
            </div>
        </main>
    )
}

export default Login