import React from "react"
import style from "./SCSS/Scroll.module.scss"
import Img from "../Common/Img"
import { useSelector } from "react-redux"

const Scroll = () => {

    const scrollState = useSelector(state => state.scroll)

    if(scrollState == 0){
        return (
            <ul id = {style.ul}>
                <li><Img src = "./img/scroll_point_full.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
            </ul>
        )
    }else if(scrollState == 1){
        return (
            <ul id = {style.ul}>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_full.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
            </ul>
        )
    }else if(scrollState == 2){
        return (
            <ul id = {style.ul}>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_full.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
            </ul>
        )
    }else {
        return (
            <ul id = {style.ul}>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_empty.svg"/></li>
                <li><Img src = "./img/scroll_point_full.svg"/></li>
            </ul>
        )
    }
}

export default Scroll