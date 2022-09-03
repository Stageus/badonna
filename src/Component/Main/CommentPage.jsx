import React from "react"
import style from "./SCSS/Comment.module.scss"
import Comment from "./Comment"
import H1 from "../Common/H1"
import Button from "../Common/Button"
import Text from "../Common/Text"
import { useSelector } from "react-redux"

const CommentPage = () => {

    const commentListState = useSelector(state => state.comment.commentList)
    console.log(commentListState)
    const commentInputTextState = useSelector(state => state.comment.commentInputText)
    const boardNumState = useSelector(state => state.comment.boardNum)

    return (
        <main id = {style.main}>
            <div id = {style.commentNav}>
                <H1 text = "댓글"/>
            </div>
            <div id = {style.commentMain}>
                {
                    commentListState[0] === undefined ?
                    <Comment/> :
                    commentListState.map((element, index) =>  
                    <Comment key = {index} user = {element.name} content = {element.contents} commentNum = {element.comment_num} boardNum = {boardNumState}/>)
                }
                <div id = {style.commentInputBox}>
                    <Text name = "comment" maxLength = "200" value = {commentInputTextState}/>
                    <Button text = "댓글 추가" name = "commentUpload" boardNum = {boardNumState} contents = {commentInputTextState}/>
                </div>
            </div>
        </main>
    )
}

export default CommentPage