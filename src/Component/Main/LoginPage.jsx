import React from "react"
import style from "./SCSS/Login.module.scss"
import Button from "../Common/Button"
import H1 from "../Common/H1"
import P from "../Common/P"
import Text from "../Common/Text"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Login = () => {

    const idInput = useSelector(state => state.login.idInput)
    const pwInput = useSelector(state => state.login.pwInput)


    return (
        <main id = {style.main}>
            <div id = {style.login}>
                <div id = "id">
                    <H1 text = "아이디"/>
                    <Text name = "loginId"/>
                    {
                        idInput.length > 0 ?
                        <P/> :
                        <P text = "아이디를 입력 해주세요."/>
                    }
                </div>
                <div pw = "pw">
                    <H1 text = "비밀번호"/>
                    <Text name = "loginPw" password/>
                    {
                        pwInput.length > 0 ?
                        <P/> :
                        <P text = "비밀번호를 입력 해주세요."/>
                    }
                </div>
                <div id = {style.buttonBox}>
                    {
                        idInput.length > 0 && pwInput.length > 0 ?
                        <Link id = {style.loginButton} to = "/">
                            <Button text = "로그인" name = "login" idInput = {idInput} pwInput = {pwInput}/>
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

export default React.memo(Login)