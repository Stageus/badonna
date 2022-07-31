import React, { useMemo } from "react"
import style from "./SCSS/Main.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { changeScroll } from "../../Redux/Action/action"
import Scroll from "./Scroll"
import Img from "../Common/Img"
import H1 from "../Common/H1"
import throttle from "lodash"

const HomePage = () => {

    const scrollState = useSelector(state => state.scroll)
    const dispatch = useDispatch()

    const scrollEvent = (event) => {
        if(event.deltaY < 0){
            dispatch(changeScroll(scrollState - 1))
        }else{
            dispatch(changeScroll(scrollState + 1))
        }
    }

    const throttleScroll = useMemo(() => _.throttle(scrollEvent, 1000), [])

    if(scrollState == 0){
        return(
            <main id = {style.main1} onWheel = {throttleScroll}>
                <Img src = "./img/question.svg"/>
                <div id = {style.home}>
                    <H1 text = "음식 배달비가 너무 "/>
                    <article>비싸</article>
                    <br/>
                    <article>싸게 </article>
                    <H1 text = "먹는 방법 없을까?"/>
                </div>
                <Scroll/>
            </main>
        )
    }else if(scrollState == 1){
        return(
            <main id = {style.main2} onWheel = {throttleScroll}>
                <Img src = "./img/communication.svg"/>
                <div id = {style.home}>
                    <article>같이</article>
                    <H1 text = " 시켜서"/>
                    <br/>
                    <H1 text = "배달비를 "/>
                    <article>줄이자!</article>
                </div>
                <Scroll/>
            </main>
        )
    }else if(scrollState == 2){
        return(
            <main id = {style.main3} onWheel = {throttleScroll}>
                <div id = {style.home}>
                    <H1 text = "지역을 "/>
                    <article>등록</article>
                    <H1 text = "해"/>
                    <br/>
                    <article>배달 친구</article>
                    <H1 text = "를 찾아"/>
                </div>
                <Img src = "./img/hello.svg"/>
                <Scroll/>
            </main>
        )
    }else{
        return(
            <main id = {style.main4} onWheel = {throttleScroll}>
                <div id = {style.home}>
                    <article>게시글</article>
                    <H1 text = "을 등록해서"/>
                    <br/>
                    <H1 text = "나랑 같은 지역 사람을 찾아"/>
                    <br/>
                    <article>같이 시키자</article>
                </div>
                <Img src = "./img/board.svg"/>
                <Scroll/>
            </main>
        )
    }
}

export default HomePage