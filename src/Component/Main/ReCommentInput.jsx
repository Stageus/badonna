import React from "react"
import { useSelector } from "react-redux"
import style from "./SCSS/Comment.module.scss"
import Text from "../Common/Text"
import Button from "../Common/Button"

const ReCommentInput = (props) => {

    const reCommentInputState = useSelector(state => state.reCommentInput)
    const commentNumState = useSelector(state => state.commentNum)
    const reCommentNumState = useSelector(state => state.reCommentNum)

    if(reCommentInputState && commentNumState === props.commentNum && reCommentNumState === props.reCommentNum){
        return (
            <div id = {style.reCommentInputBox}>
                <Text placeholder = "답글 달기" name = "reComment" maxLength = "200"/>
                <Button id = {style.reCommentButton} text = "확인" name = "reCommentInputUpload" commentNum = {props.commentNum}/>
                <Button id = {style.reCommentButton} text = "취소" name = "reCommentInputUpload" cancel = "cancel"/>
            </div>
        )
    }
    return (
        <div id = {style.reCommentInputBox}>
            <Button id = {style.reCommentButton} name = "reCommentInput" text = "답글 달기" 
            commentNum = {props.commentNum} reCommentNum = {props.reCommentNum}/>
        </div>
    )
}

export default ReCommentInput