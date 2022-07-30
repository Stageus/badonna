import React from "react"
import style from "./SCSS/MoreView.module.scss"
import Button from "../Common/Button"
import { useSelector } from "react-redux"

const MoreView = (props) => {
    
    const moreViewState = useSelector(state => state.moreView)
    const boardNumState = useSelector(state => state.boardNum)
    const commentNumState = useSelector(state => state.commentNum)
    const reCommentNumState = useSelector(state => state.reCommentNum)
    const hiddenButtonStyle = {
        display: "none"
    }
    if(moreViewState && (props.boardNum === boardNumState || props.commentNum === commentNumState || props.reCommentNum === reCommentNumState)){
        hiddenButtonStyle.display = "flex"
    }


    if(props.name === "board"){
        return (
            <React.Fragment>
                <Button id = {style.moreView} text = ">" name = "moreView" boardNum = {props.boardNum} moreViewName = {props.name}/>
                <ul id = {style.hiddenButton} style = {hiddenButtonStyle}>
                    <li>
                        <Button text = "게시글 수정"/>
                    </li>
                    <li id = {style.line}></li>
                    <li>
                        <Button text = "게시글 삭제"/>
                    </li>
                </ul>
            </React.Fragment>
        )
    }else if(props.name === "comment"){
        return (
            <React.Fragment>
                <Button id = {style.moreView} text = ">" name = "moreView" commentNum = {props.commentNum} moreViewName = {props.name}/>
                <ul id = {style.hiddenButton} style = {hiddenButtonStyle}>
                    <li>
                        <Button text = "댓글 수정"/>
                    </li>
                    <li id = {style.line}></li>
                    <li>
                        <Button text = "댓글 삭제"/>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <Button id = {style.moreView} text = ">" name = "moreView" reCommentNum = {props.reCommentNum} moreViewName = {props.name}/>
            <ul id = {style.hiddenButton} style = {hiddenButtonStyle}>
                <li>
                    <Button text = "답글 수정"/>
                </li>
                <li id = {style.line}></li>
                <li>
                    <Button text = "답글 삭제"/>
                </li>
            </ul>
        </React.Fragment>
    )
}

export default MoreView