import React from "react"
import style from "./SCSS/Board.module.scss"
import H1 from "../Common/H1"
import Board from "./Board"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { boardNew } from "../../Redux/Action/boardAction"

const BoardPage = () => {

    const dispatch = useDispatch()
    const boardListState = useSelector(state => state.board.boardList)
    const scrollOffsetState = useSelector(state => state.board.scrollOffset)
    
    const onScroll = (event) => {
        const scrollHeight = event.target.clientHeight //한 눈에 보이는 스크롤 영역
        const scroll = event.target.scrollTop + scrollHeight // 현재 스크롤 위치
        const mainHeight = event.target.scrollHeight //진짜 스크롤 높이

        if(scroll === mainHeight){
            dispatch(boardNew(scrollOffsetState))
        }
    }

    return (
        <main id = {style.main} onScroll = {onScroll}>
            <div id = {style.boardNav}>
                <H1 text = "게시글"/>
                <button>
                    <Link to="/boardWrite">게시글 쓰기</Link>
                </button>
            </div>
            {
                boardListState[0] === undefined &&
                <div>
                    게시글이 없습니다 작성해 주세요.
                </div>
            }
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