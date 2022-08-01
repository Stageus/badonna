import React from "react"
import Button from "../Common/Button"
import style from "./SCSS/ButtonBox.module.scss"
import { Link } from "react-router-dom"

const ButtonBox = () => {

    return(
        <div id = {style.buttonBox}>
            <button>
                <Link to = "/login">로그인</Link>
            </button>
            <Button text = "주소 즐겨찾기" name = "address"/>
            <button>
                <Link to = "/board">게시글</Link>
            </button>
            <button>
                <Link to = "/profile">회원정보</Link>
            </button>
            
        </div>
    )
}

export default ButtonBox