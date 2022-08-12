import React, { useEffect } from "react"
import style from "./SCSS/Profile.module.scss"
import H1 from "../Common/H1"
import P from "../Common/P"
import Button from "../Common/Button"
import { useSelector } from "react-redux"

const Profile = () => {

    const user = useSelector(state => state.profile.user)

    return (
        <main id = {style.profile}>
            <H1 text = "회원정보"/>
            <div id = {style.box}>
                <div id = {style.id}>
                    <P text = "아이디"/>
                    <P id = {style.data} text = {user.id}/>
                </div>
                <div id = {style.tel}>
                    <P text = "전화번호"/>
                    <P id = {style.data} text = {user.userId}/>
                </div>
                <div id = {style.name}>
                    <P text = "이름"/>
                    <P id = {style.data} text = {user.title}/>
                </div>
                <div id = {style.address}>
                    <P text = "즐겨찾기된 지역"/>
                    <P id = {style.data} text = {user.body}/>
                    <Button text = "변경" name = "address"/>
                </div>
            </div>
        </main>
    )
}

export default Profile