import React from "react"
import style from "./SCSS/Comment.module.scss"
import ReCommentInput from "./ReCommentInput"
import H2 from "../Common/H2"
import P from "../Common/P"

const ReComment = (props) => {

    if(props.user == null){
        return(
            <React.Fragment></React.Fragment>
        )
    }
    return (
        <div id = {style.reComment}>
            <H2 text = {props.user}/>
            <P text = {props.content}/>
            <ReCommentInput commentNum = {props.commentNum} reCommentNum = {props.reCommentNum}/>
        </div>
    )
}

export default ReComment