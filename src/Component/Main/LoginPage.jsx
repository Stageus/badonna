import React from "react"
import style from "./SCSS/Login.module.scss"
import Button from "../Common/Button"
import H1 from "../Common/H1"
import P from "../Common/P"
import Text from "../Common/Text"
import { Link } from "react-router-dom"

const Login = () => {

    return (
        <main id = {style.main}>
            <div id = {style.login}>
                <div id = "id">
                    <H1 text = "아이디"/>
                    <Text/>
                    <P text = "아이디를 입력 해주세요."/>
                </div>
                <div pw = "pw">
                    <H1 text = "비밀번호"/>
                    <Text/>
                    <P text = "비밀번호를 입력 해주세요."/>
                </div>
                <div id = {style.buttonBox}>
                    <Button text = "로그인"/>
                    <Link id = {style.join} to = "/termsOfService">회원가입</Link>
                </div>
            </div>
        </main>
    )
}

export default Login