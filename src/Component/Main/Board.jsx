import React from "react"
import style from "./SCSS/Board.module.scss"
import H2 from "../Common/H2"
import P from "../Common/P"
import MoreView from "./MoreView"
import Button from "../Common/Button"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { comment } from "../../Redux/Action/commentAction"

const Board = (props) => {
    
    const commentListState = useSelector(state => state.comment.commentList)
    return (
        <article className = {style.board}>
            <div className = {style.boardTitleBox}>
                <H2 id = {style.name} text = {props.boardUser}/>
                <H2 text = {`[0 / ${props.boardRecruit}] ${props.boardTitle}`}/>
                <MoreView boardNum = {props.boardNum} name = "board"/>
                <P text = {`${props.boardDate} ${props.boardLocation}`}/>
            </div>
            <div className = {style.boardContent}>
                <P text = {props.boardContent}/>
            </div>
            <div className = {style.boardComment}>
                <H2 text = "댓글"/>
                {
                    commentListState[0] === undefined || commentListState[0].boardNum !== props.boardnum ?
                    <div className = {style.commentBox}>
                        <Link to = "/board/comment">
                            <Button id = {style.more} text = "댓글 쓰기" name = "commentPage" boardNum = {props.boardNum}/>
                        </Link>
                    </div> :
                    <div className = {style.commentBox}>
                        <div className = {style.commentText}>
                            <H2 id = {style.name} text = {commentListState.user}/>
                            <P text = {commentListState.content}/>
                        </div>
                    <div className = {style.commentBox}>
                        <Link to = "/board/comment">
                            <Button id = {style.more} text = "댓글 더보기" name = "commentPage" boardNum = {props.boardNum}/>
                        </Link>
                    </div>
                    </div>
                }
            </div>
        </article>
    )
}

export default Board