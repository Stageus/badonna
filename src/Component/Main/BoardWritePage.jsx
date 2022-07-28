import React from "react"
import style from "./SCSS/Board.module.scss"
import Text from "../Common/Text"
import Button from "../Common/Button"

const BoardWritePage = () => {

    return (
        <main>
            <div id = {style.boardWriteBox}>
                <div id = {style.titleBox}>
                    <Text placeholder = "제목"/>
                    <Text placeholder = "주소 직접 입력"/>
                    <Button text = "주소 즐겨찾기" name = "address"/>
                </div>
                <div id = {style.contentBox}>
                    <textarea></textarea>
                </div>
                <Button text = "게시글 등록"/>
            </div>
        </main>
    )
}

export default BoardWritePage