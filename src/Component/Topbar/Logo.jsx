import React from "react"
import Img from "../Common/Img"
import style from "./SCSS/Logo.module.scss"
import { Link } from "react-router-dom"

const Logo = () => {

    return(
        <Link to = "/" id = {style.logo}>
            <Img src = "./img/logo-white.svg"/>
        </Link>
    )
}

export default Logo