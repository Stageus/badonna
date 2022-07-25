import React from "react"
import { useSelector } from "react-redux"
import style from "./SCSS/Comment.module.scss"
import Text from "../Common/Text"
import Button from "../Common/Button"

const ReCommentWrite = (props) => {

    const reCommentWriteState = useSelector(state => state.reCommentWrite)
    const commentNumState = useSelector(state => state.commentNum)
    const reCommentNumState = useSelector(state => state.reCommentNum)

    if(reCommentWriteState && commentNumState == props.commentNum && reCommentNumState == props.reCommentNum){
        return (
            <div id = {style.reCommentInputBox}>
                <Text placeholder = "답글 달기"/>
                <Button text = "확인"/>
                <Button text = "취소"/>
            </div>
        )
    }
    return (
        <div id = {style.reCommentInputBox}>
            <Button id = {style.reCommentButton} name = "reCommentWrite" text = "답글 달기" 
        commentNum = {props.commentNum} reCommentNum = {props.reCommentNum}/>
        </div>
    )
}

export default ReCommentWrite