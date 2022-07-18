import React from "react"
import style from "./SCSS/Board.module.scss"
import H1 from "../Common/H1"
import H2 from "../Common/H2"
import P from "../Common/P"
import Button from "../Common/Button"

const Board = () => {

    return (
        <main id = {style.main}>
            <div id = {style.boardNav}>
                <H1 text = "게시글"/>
                <Button text = "게시글 쓰기" name = "boardWrite"/>
            </div>
            <article className = {style.board}>
                <div className = {style.boardTitleBox}>
                    <H2 id = {style.name} text = "이름"/>
                    <H2 text = "마라탕 같이 드실분!"/>
                    <Button text = "…"/>
                    <P text = "2022-07-17 인천시 부평구"/>
                </div>
                <div className = {style.boardContent}>
                    <P text = "접선 장소는..."/>
                </div>
                <div className = {style.boardComment}>
                    <H2 text = "댓글"/>
                    <div className = {style.commentBox}>
                        <div className = {style.commentText}>
                            <H2 id = {style.name} text = "이름"/>
                            <P text = "저요"/>
                            <Button text = "…"/>
                        </div>
                        <Button id = {style.more} name = "comment" text = "댓글 더보기"/>
                    </div>
                </div>
            </article>
        </main>
    )
}

export default Board