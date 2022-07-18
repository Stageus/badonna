import React from "react"
import style from "./SCSS/Login.module.scss"
import Button from "../Common/Button"
import H1 from "../Common/H1"
import P from "../Common/P"
import Text from "../Common/Text"

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
                    <Button id = {style.join} name = "join" text = "회원 가입"/>
                </div>
            </div>
        </main>
    )
}

export default Login