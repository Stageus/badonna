import React from "react"
import style from "./SCSS/Board.module.scss"
import H1 from "../Common/H1"
import Board from "./Board"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BoardPage = () => {

    
    const boardListState = useSelector(state => state.board.boardList)
    console.log(boardListState)
    if(boardListState[0] === undefined){
        return(
            <main id = {style.main}>
                <div id = {style.boardNav}>
                    <H1 text = "게시글"/>
                    <button>
                        <Link to="/board/boardWrite">게시글 쓰기</Link>
                    </button>
                </div>
                <div>
                    게시글이 없습니다 작성해 주세요.
                </div>
            </main>
        )
    }

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
                        boardNum = {element.board_num} 
                        boardTitle = {element.title} 
                        boardContent = {element.contents}
                        boardUser = {element.id} 
                        boardDate = {element.date}
                        boardLocation = {element.place}
                        boardRecruit = {element.join_count}/>
                )
            }
        </main>
    )
}

export default BoardPage