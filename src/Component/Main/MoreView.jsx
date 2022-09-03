import React from "react"
import style from "./SCSS/MoreView.module.scss"
import Button from "../Common/Button"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const MoreView = (props) => {
    
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
            <Button id = {style.moreView} text = ">" name = "moreView" reCommentNum = {props.reCommentNum} moreViewName = {props.name}/>
                {
                    props.name === "board" ?
                    <ul id = {style.hiddenButton} style = {hiddenButtonStyle}>
                        <li>
                            <Link to = "/board/boardWrite">
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
                            <Link to = "/board/boardWrite">
                                <Button text = "댓글 수정" name = "boardEdit" boardNum = {props.boardNum}/>
                            </Link>
                        </li>
                        <li>
                            <Button text = "댓글 삭제" name = "boardDelete" boardNum = {props.boardNum}/>
                        </li>
                    </ul> :
                    <ul id = {style.hiddenButton} style = {hiddenButtonStyle}>
                        <li>
                            <Button text = "답글 수정" name = "reCommentEdit"/>
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