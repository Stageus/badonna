import React from "react"
import { useSelector } from "react-redux"
import style from "./SCSS/Comment.module.scss"
import Text from "../Common/Text"
import Button from "../Common/Button"

const ReCommentInput = (props) => {

    const boardNumState = useSelector(state => state.comment.boardNum)
    const reCommentInputState = useSelector(state => state.comment.reCommentInput)
    const commentNumState = useSelector(state => state.comment.commentNum)
    const reCommentNumState = useSelector(state => state.comment.reCommentNum)
    const reCommentInputTextState = useSelector(state => state.comment.reCommentInputText)
    const commentEditTextState = useSelector(state => state.comment.commentEditText)
    
    if(props.comment){
        return(
            <div id = {style.commentEditBox}>
                <Text name = "commentEdit" maxLength = "200" value = {commentEditTextState || ""}/>
                <Button id = {style.commentButton} text = "확인" name = "commentEdit" boardNum = {boardNumState} commentNum = {props.commentNum} contents = {commentEditTextState}/>
                <Button id = {style.commentButton} text = "취소" name = "commentInput"/>
            </div>
        )
    }
    return (
        <div id = {style.reCommentInputBox}>
            {
                reCommentInputState === true &&
                commentNumState === props.commentNum && 
                reCommentNumState === props.reCommentNum ?
                <React.Fragment>
                    <Text placeholder = "답글 달기" name = "reCommentUpload" maxLength = "200" value = {reCommentInputTextState || ""}/>
                    <Button id = {style.reCommentButton} text = "확인" name = "reCommentUpload" commentNum = {props.commentNum} content = {reCommentInputTextState}/>
                    <Button id = {style.reCommentButton} text = "취소" name = "reCommentInput"/>
                </React.Fragment> :
                <Button id = {style.reCommentOpenButton} name = "reCommentInput" text = "답글 달기" 
                 commentNum = {props.commentNum} reCommentNum = {props.reCommentNum}/>
            }
        </div>
    )
}

export default ReCommentInput