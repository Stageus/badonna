import React from "react"
import style from "./SCSS/Board.module.scss"
import H1 from "../Common/H1"
import Board from "./Board"
import Button from "../Common/Button"
import { useSelector } from "react-redux"

const BoardPage = () => {

    const boardTitleList = useSelector(state => state.boardTitle)
    const boardContentList = useSelector(state => state.boardContent)
    const boardUserList = useSelector(state => state.boardUser)
    const boardDateList = useSelector(state => state.boardDate)
    const boardLocationList = useSelector(state => state.boardLocation)
    const commentUserList = useSelector(state => state.commentUser)
    const commentContentList = useSelector(state => state.commentContent)

    return (
        <main id = {style.main}>
            <div id = {style.boardNav}>
                <H1 text = "게시글"/>
                <Button text = "게시글 쓰기" name = "boardWrite"/>
            </div>
            {
                boardTitleList.map((element, index, arr) =>
                    <Board key = {index} index = {index} boardTitle = {element} boardContent = {boardContentList[index]}
                            boardUser = {boardUserList[index]} boardDate = {boardDateList[index]}
                            boardLocation = {boardLocationList[index]} commentUser = {commentUserList[index][0]}
                            commentContent = {commentContentList[index][0]}/>
                )
            }
        </main>
    )
}

export default BoardPage