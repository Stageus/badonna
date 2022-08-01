import React from "react"
import style from "./SCSS/Board.module.scss"
import H1 from "../Common/H1"
import Board from "./Board"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BoardPage = () => {

    const boardListState = useSelector(state => state.board.boardList)

    return (
        <main id = {style.main}>
            <div id = {style.boardNav}>
                <H1 text = "게시글"/>
                <button>
                    <Link to="/board/boardWrite">게시글 쓰기</Link>
                </button>
            </div>
            {
                boardListState&&boardListState.map((element, index, arr) =>
                    <Board key = {index} 
                        boardNum = {element.boardNum} 
                        boardTitle = {element.title} 
                        boardContent = {element.content}
                        boardUser = {element.user} 
                        boardDate = {element.date}
                        boardLocation = {element.location}
                        boardRecruit = {element.recruit}/>
                )
            }
        </main>
    )
}

export default BoardPage