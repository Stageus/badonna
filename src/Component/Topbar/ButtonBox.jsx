import React from "react"
import Button from "../Common/Button"
import style from "./SCSS/ButtonBox.module.scss"
import { Link } from "react-router-dom"

const ButtonBox = () => {

    return(
        <div id = {style.buttonBox}>
            <Link to = "/login">로그인</Link>
            <Button text = "주소 즐겨찾기" name = "address"/>
            <Link to = "/board">게시글</Link>
            <Link to = "/profile">회원정보</Link>
        </div>
    )
}

export default ButtonBox