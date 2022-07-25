import React from "react"
import { useSelector } from "react-redux"
import style from "./SCSS/Comment.module.scss"
import Comment from "./Comment"
import H1 from "../Common/H1"
import Button from "../Common/Button"
import Text from "../Common/Text"

const CommentPage = () => {

    const boardNum = useSelector(state => state.boardNum)
    const commentUserList = useSelector(state => state.commentUser)[boardNum]
    const commentContentList = useSelector(state => state.commentContent)[boardNum]

    return (
        <main id = {style.main}>
            <div id = {style.commentNav}>
                <H1 text = "댓글"/>
            </div>
            <div id = {style.commentMain}>
                {
                    commentUserList.map((element, index, arr) =>  
                    <Comment key = {index} user = {element} content = {commentContentList[index]} commentNum = {index}/>)
                }
                <div id = {style.commentInputBox}>
                    <Text/>
                    <Button text = "댓글 추가"/>
                </div>
            </div>
        </main>
    )
}

export default CommentPage