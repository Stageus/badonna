import React from "react"
import style from "./SCSS/MoreView.module.scss"
import Button from "../Common/Button"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { getCookie } from "../../Module/cookie"

const MoreView = (props) => {
    
    if(props.user !== getCookie("id")){
        return(
            <div id = {style.moreView}></div>
        )
    }
    const moreViewState = useSelector(state => state.home.moreView)
    const hiddenButtonStyle = {
        display: "none"
    }
    if(moreViewState.isOpen && 
        (props.boardNum === moreViewState.num || props.commentNum === moreViewState.num || props.reCommentNum === moreViewState.num) &&
        (props.name === moreViewState.name)){
        hiddenButtonStyle.display = "flex"
    }
    return (
        <React.Fragment>
            <Button id = {style.moreView} text = ">" name = "moreView" boardNum = {props.boardNum} commentNum = {props.commentNum} reCommentNum = {props.reCommentNum} moreViewName = {props.name}/>
                {
                    props.name === "board" ?
                    <ul id = {style.hiddenButton} style = {hiddenButtonStyle}>
                        <li>
                            <Link to = "/boardWrite">
                                <Button text = "게시글 수정" name = "boardEdit" boardNum = {props.boardNum}/>
                            </Link>
                        </li>
                        <li>
                            <Button text = "게시글 삭제" name = "boardDelete" boardNum = {props.boardNum}/>
                        </li>
                    </ul> :
                    props.name === "comment" ?
                    <ul id = {style.hiddenButton} style = {hiddenButtonStyle}>
                        <li>
                            <Button text = "댓글 수정" name = "commentInput" commentNum = {props.commentNum} boardNum = {props.boardNum}/>
                        </li>
                        <li>
                            <Button text = "댓글 삭제" name = "commentDelete" commentNum = {props.commentNum} boardNum = {props.boardNum}/>
                        </li>
                    </ul> :
                    <ul id = {style.hiddenButton} style = {hiddenButtonStyle}>
                        <li>
                            <Button text = "답글 수정" name = "reCommentInput" commentNum = {props.commentNum} reCommentNum = {props.reCommentNum}/>
                        </li>
                        <li>
                            <Button text = "답글 삭제" name = "reCommentDelete"/>
                        </li>
                    </ul>
                }
        </React.Fragment>
    )
}

export default MoreView