import React from "react"
import style from "./SCSS/Join.module.scss"
import Button from "../Common/Button"
import Text from "../Common/Text"
import H2 from "../Common/H2"
import P from "../Common/P"

const Join = () => {

    return (
        <main id = {style.join}>
            <div id = {style.inputBox}>
                <div id = {style.id}>
                    <H2 text = "아이디"/>
                    <Text/>
                    <Button text = "중복 체크"/>
                    <P text = "아이디를 입력 해주세요."/>
                </div>
                <div id = {style.pw}>
                    <H2 text = "비밀번호"/>
                    <Text/>
                    <P text = "비밀번호를 입력 해주세요."/>
                </div>
                <div id = {style.pwCheck}>
                    <H2 text = "비밀번호 확인"/>
                    <Text/>
                    <P text = "비밀번호가 틀립니다."/>
                </div>
                <div id = {style.tel}>
                    <H2 text = "전화번호"/>
                    <H2 id = {style.telText} text = "010"/>
                    <H2 id = {style.telText} text = "-"/>
                    <Text/>
                    <H2 id = {style.telText} text = "-"/>
                    <Text/>
                    <Button text = "전화번호 인증"/>
                    <P text = "전화번호를 입력 해주세요."/>
                </div>
                <div id = {style.name}>
                    <H2 text = "이름"/>
                    <Text/>
                    <P text = "이름을 입력 해주세요."/>
                </div>
            </div>
            <Button id = {style.joinButton} text = "가입" name = "joinButton"/>
        </main>
    )
}

export default Join