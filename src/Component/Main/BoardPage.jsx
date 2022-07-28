import React from "react"
import style from "./SCSS/Board.module.scss"
import H1 from "../Common/H1"
import Board from "./Board"
import Button from "../Common/Button"
import { useSelector } from "react-redux"

const BoardPage = () => {

    const boardListState = useSelector(state => state.boardList)
    const commentListState = useSelector(state => state.commentList)

    return (
        <main id = {style.main}>
            <div id = {style.boardNav}>
                <H1 text = "게시글"/>
                <Button text = "게시글 쓰기" name = "boardWrite"/>
            </div>
            {
                boardListState.map((element, index, arr) =>
                    <Board key = {index} index = {index} boardTitle = {element.title} boardContent = {element.content}
                            boardUser = {element.user} boardDate = {element.date}
                            boardLocation = {element.location} commentUser = {commentListState[index][0].user}
                            commentContent = {commentListState[index][0].content}/>
                )
            }
        </main>
    )
}

export default BoardPage