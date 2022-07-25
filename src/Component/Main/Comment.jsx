import React from "react"
import style from "./SCSS/Comment.module.scss"
import H2 from "../Common/H2"
import P from "../Common/P"
import ReCommentWrite from "./ReCommentWrite"
import ReComment from "./ReComment"
import { useSelector, useDispatch } from "react-redux"

const Comment = (props) => {

    const reCommentUserState = useSelector(state => state.reCommentUser)[props.commentNum]
    const reCommentContentState = useSelector(state => state.reCommentContent)[props.commentNum]

    return (
        <div id = {style.commentBox}>
            <div id = {style.comment}>
                <H2 text = {props.user}/>
                <P text = {props.content}/>
                <ReCommentWrite commentNum = {props.commentNum}/>
            </div>
            {
                reCommentUserState.map((element, index, arr) => 
                <ReComment key = {index} reCommentNum = {index} commentNum = {props.commentNum} user = {element} content = {reCommentContentState[index]}/>)
            }
        </div>
    )
}

export default Comment