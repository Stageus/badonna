import React from "react"
import Button from "../Common/Button"
import style from "./SCSS/ButtonBox.module.scss"

const ButtonBox = () => {

    return(
        <div id = {style.buttonBox}>
            <Button text = "로그인" name = "login"/>
            <Button text = "주소 즐겨찾기" name = "address"/>
            <Button text = "게시글" name = "board"/>
            <Button text = "회원정보" name = "profile"/>
        </div>
    )
}

export default ButtonBox