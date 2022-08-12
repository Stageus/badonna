import React from "react"
import style from "./SCSS/Board.module.scss"
import H2 from "../Common/H2"
import P from "../Common/P"
import MoreView from "./MoreView"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Board = (props) => {
       
    const commentListState = useSelector(state => state.comment.commentList[0][props.boardNum])
    
    if(commentListState != null){
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
                    <div className = {style.commentBox}>
                        <div className = {style.commentText}>
                            <H2 id = {style.name} text = {commentListState.user}/>
                            <P text = {commentListState.content}/>
                        </div>
                        <button id = {style.more}>
                            <Link to = {`/board${props.boardNum}/comment`}>댓글 더보기</Link>
                        </button>
                    </div>
                </div>
            </article>
        )
    }
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
                    <div className = {style.commentBox}>
                        <button id = {style.more}>
                        <Link to = {`/board${props.boardNum}/comment`}>댓글 쓰기</Link>
                        </button>
                    </div>
                </div>
        </article>
    )
}

export default Board