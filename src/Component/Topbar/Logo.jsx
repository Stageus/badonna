import React from "react"
import Img from "../Common/Img"
import style from "./SCSS/Logo.module.scss"
import { useDispatch } from "react-redux"
import { home } from "../../Redux/Action/action"

const Logo = () => {

    const dispatch = useDispatch()

    const onClickEvent = (event) => {
        dispatch(home())
    }

    return(
        <div id = {style.logo} name = "home" onClick = {onClickEvent}>
            <Img src = "./img/logo-white.svg"/>
        </div>
    )
}

export default Logo