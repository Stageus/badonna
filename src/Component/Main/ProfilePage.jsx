import React from "react"
import style from "./SCSS/Profile.module.scss"
import H1 from "../Common/H1"
import P from "../Common/P"
import Button from "../Common/Button"
import { useSelector } from "react-redux"

const Profile = () => {

    const userId = useSelector(state => state.userId)
    const userTel = useSelector(state => state.userTel)
    const userName = useSelector(state => state.userName)
    let userAddress = useSelector(state => state.userAddress)

    if (userAddress.length > 1){
        userAddress = `${userAddress[0]} 등`
    }

    return (
        <main id = {style.profile}>
            <H1 text = "회원정보"/>
            <div id = {style.box}>
                <div id = {style.id}>
                    <P text = "아이디"/>
                    <P id = {style.data} text = {userId}/>
                </div>
                <div id = "tel">
                    <P text = "전화번호"/>
                    <P id = {style.data} text = {userTel}/>
                </div>
                <div id = "name">
                    <P text = "이름"/>
                    <P id = {style.data} text = {userName}/>
                </div>
                <div id = "address">
                    <P text = "즐겨찾기된 지역"/>
                    <P id = {style.data} text = {userAddress}/>
                    <Button text = "변경" name = "address"/>
                </div>
            </div>
        </main>
    )
}

export default Profile