import React from "react"
import style from "./SCSS/Board.module.scss"
import H2 from "../Common/H2"
import P from "../Common/P"
import Button from "../Common/Button"

const Board = (props) => {
    
    if(props.commentUser != undefined){
        return (
        <article className = {style.board}>
            <div className = {style.boardTitleBox}>
                <H2 id = {style.name} text = {props.boardUser}/>
                <H2 text = {props.boardTitle}/>
                <Button text = "…"/>
                <P text = {`${props.boardDate} ${props.boardLocation}`}/>
            </div>
            <div className = {style.boardContent}>
                <P text = {props.boardContent}/>
            </div>
            <div className = {style.boardComment}>
                <H2 text = "댓글"/>
                <div className = {style.commentBox}>
                    <div className = {style.commentText}>
                        <H2 id = {style.name} text = {props.commentUser}/>
                        <P text = {props.commentContent}/>
                        <Button text = "…"/>
                    </div>
                    <Button id = {style.more} name = "comment" text = "댓글 더보기" boardNum = {props.index}/>
                </div>
            </div>
        </article>
    )
    }
    return (
            <article className = {style.board}>
                <div className = {style.boardTitleBox}>
                    <H2 id = {style.name} text = {props.boardUser}/>
                    <H2 text = {props.boardTitle}/>
                    <Button text = "…"/>
                    <P text = {`${props.boardDate} ${props.boardLocation}`}/>
                </div>
                <div className = {style.boardContent}>
                    <P text = {props.boardContent}/>
                </div>
            </article>
        )
}

export default Board