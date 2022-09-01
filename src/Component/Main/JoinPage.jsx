import React from "react"
import style from "./SCSS/Join.module.scss"
import Button from "../Common/Button"
import Text from "../Common/Text"
import H2 from "../Common/H2"
import P from "../Common/P"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const JoinPage = () => {

    const isSameId = useSelector(state => state.join.isSameId)
    const id = useSelector(state => state.join.idInput)
    const pwCheck = useSelector(state => state.join.pwCheck)
    const isSamePw = useSelector(state => state.join.isSamePw)
    const nameCheck = useSelector(state => state.join.nameCheck)

    return (
        <main id = {style.join}>
            <div id = {style.joinBox}>
                <div id = {style.inputBox}>
                    <div id = {style.id}>
                        <H2 text = "아이디"/>
                        {
                            isSameId ?
                            <Text name = "idInput" value = {id} disabled/> :
                            <Text name = "idInput" disabled/>
                        }
                        <Button text = "중복 체크" name = "idCheckDialog"/>
                        {
                            isSameId ? 
                            <P/> :
                            <P text = "아이디 중복체크를 클릭해 주세요."/>
                        }
                    </div>
                    <div id = {style.pw}>
                        <H2 text = "비밀번호"/>
                        <Text name = "pwInput" maxLength = "16" password/>
                        {
                            pwCheck ?
                            <P/> :
                            <P text = "비밀번호를 입력 해주세요."/>
                        }
                    </div>
                    <div id = {style.pwCheck}>
                        <H2 text = "비밀번호 확인"/>
                        <Text name = "pwCheckInput" maxLength = "16" password/>
                        {
                            isSamePw ?
                            <P/>:
                            <P text = "비밀번호가 틀립니다."/>
                        }
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
                        {
                            nameCheck?
                            <P/>:
                            <P text = "이름을 입력 해주세요."/>
                        }
                    </div>
                </div>
                {
                    
                    <Link to = "/">
                        <Button id = {style.Button} text = "가입" name = "joinButton"/>
                    </Link>
                }       
            </div>
        </main>
    )
}

export default React.memo(JoinPage)