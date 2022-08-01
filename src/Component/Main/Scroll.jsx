import React from "react"
import style from "./SCSS/Scroll.module.scss"
import Img from "../Common/Img"
import { useSelector } from "react-redux"

const Scroll = () => {

    const scrollState = useSelector(state => state.scroll)

    if(scrollState == 0){
        return (
            <div id = {style.ulBox}>
                <ul id = {style.ul}>
                    <li><Img src = "./img/scroll_point_full.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                </ul>
            </div>
        )
    }else if(scrollState == 1){
        return (
            <div id = {style.ulBox}>
                <ul id = {style.ul}>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_full.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                </ul>
            </div>
        )
    }else if(scrollState == 2){
        return (
            <div id = {style.ulBox}>
                <ul id = {style.ul}>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_full.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                </ul>
            </div>
        )
    }else {
        return (
            <div id = {style.ulBox}>
                <ul id = {style.ul}>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_empty.svg"/></li>
                    <li><Img src = "./img/scroll_point_full.svg"/></li>
                </ul>
            </div>
        )
    }
}

export default Scroll