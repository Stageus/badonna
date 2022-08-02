import React from "react"
import style from "./SCSS/Join.module.scss"
import Button from "../Common/Button"
import Text from "../Common/Text"
import H2 from "../Common/H2"
import P from "../Common/P"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const JoinPage = () => {

    const idCheck = useSelector(state => state.idCheck)

    const visibleText = {
        display: "inline-block"
    }
    if(idCheck){
        const hiddenText = {...visibleText}
        hiddenText = {
            display: "none"
        }
        visibleText = hiddenText
    }
    console.log(visibleText)

    return (
        <main id = {style.join}>
            <div id = {style.joinBox}>
                <div id = {style.inputBox}>
                    <div id = {style.id}>
                        <H2 text = "아이디"/>
                        <Text name = "idInput" maxLength = "12"/>
                        <Button text = "중복 체크" name = "idCheckDialog"/>
                        <P text = "아이디를 입력 해주세요." style = {visibleText}/>
                    </div>
                    <div id = {style.pw}>
                        <H2 text = "비밀번호"/>
                        <Text name = "pwInput" maxLength = "16"/>
                        <P text = "비밀번호를 입력 해주세요."/>
                    </div>
                    <div id = {style.pwCheck}>
                        <H2 text = "비밀번호 확인"/>
                        <Text name = "pwCheckInput" maxLength = "16"/>
                        <P text = "비밀번호가 틀립니다."/>
                    </div>
                    <div id = {style.tel}>
                        <H2 text = "전화번호"/>
                        <H2 id = {style.telText} text = "010"/>
                        <H2 id = {style.telText} text = "-"/>
                        <Text name = "telMiddleInput" maxLength = "4"/>
                        <H2 id = {style.telText} text = "-"/>
                        <Text name = "telLastInput" maxLength = "4"/>
                        <Button text = "전화번호 인증" name = "telCheckDialog"/>
                        <P text = "전화번호를 입력 해주세요."/>
                    </div>
                    <div id = {style.name}>
                        <H2 text = "이름"/>
                        <Text name = "nameInput" maxLength = "4"/>
                        <P text = "이름을 입력 해주세요."/>
                    </div>
                </div>
                <Link to = "/">
                    <Button id = {style.Button} text = "가입" name = "Button"/>
                </Link>
            </div>
        </main>
    )
}

export default JoinPage