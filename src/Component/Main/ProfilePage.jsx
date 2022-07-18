import React from "react"
import style from "./SCSS/Profile.module.scss"
import H1 from "../Common/H1"
import P from "../Common/P"
import Button from "../Common/Button"

const Profile = () => {

    return (
        <main id = {style.profile}>
            <H1 text = "회원정보"></H1>
            <div id = {style.box}>
                <div id = {style.id}>
                    <P text = "아이디"></P>
                    <P id = {style.data} text = "dd"></P>
                </div>
                <div id = "tel">
                    <P text = "전화번호"></P>
                    <P id = {style.data} text = "dd"></P>
                </div>
                <div id = "name">
                    <P text = "이름"></P>
                    <P id = {style.data} text = "dd"></P>
                </div>
                <div id = "address">
                    <P text = "즐겨찾기된 지역"></P>
                    <P id = {style.data} text = "서울시 구로구 궁동"></P>
                    <Button text = "변경" id = "address"></Button>
                </div>
            </div>
        </main>
    )
}

export default Profile