import React from "react"
import Button from "../Common/Button"
import style from "./SCSS/ButtonBox.module.scss"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { getCookie } from "../../Module/cookie"

const ButtonBox = () => {

    const token = getCookie("access-token")
    const id = getCookie("id")
    const topBar = useSelector(state => state.login.topbar)

    return(
        <div id = {style.buttonBox}>
            {
                !topBar && <Link to = "/login"><Button text = "로그인" name = "loginPage"/></Link>
            }
            {
                topBar && <Link to = "/"><Button text = "로그아웃" name = "logout"/></Link>
            }
            <Button text = "주소 즐겨찾기" name = "address"/>
            <Link to = "/board"><Button text = "게시글" name = "boardPage" token = {token}/></Link>
            <Link to = "/profile"><Button text = "회원정보" name = "profilePage"/></Link>
        </div>
    )
}

export default ButtonBox