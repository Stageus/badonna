import React, { useEffect } from "react"
import style from "./SCSS/Board.module.scss"
import Text from "../Common/Text"
import Button from "../Common/Button"
import P from "../Common/P"
import { useSelector, useDispatch } from "react-redux"
import { boardContentText, boardInputLength } from "../../Redux/Action/action"

const BoardWritePage = () => {

    const dispatch = useDispatch()
    const inputLengthState = useSelector(state => state.boardInput.content)
    
    const inputEvent = (event) => {
        console.log(event.target.value)
        dispatch(boardContentText(event.target.value))
    }

    return (
        <main>
            <div id = {style.boardWriteBox}>
                <div id = {style.titleBox}>
                    <Text placeholder = "제목" name = "boardTitle" maxLength = "20"/>
                    <div id = {style.addressBox}>
                        <Text id = {style.addressInput} placeholder = "주소 직접 입력" name = "boardAddress" maxLength = "20"/>
                        <Button text = "주소 즐겨찾기" name = "address"/>
                    </div>
                    <div id = {style.recruitBox}>
                        <Text id = {style.recruit} placeholder = "모집인원" name = "boardRecruit" maxLength = "2"/>
                        <P text = "명"/>
                    </div>
                </div>
                <div id = {style.contentBox}>
                    <textarea id = "content" placeholder = "내용" onChange = {inputEvent} maxLength = "200" value = {inputLengthState}></textarea>
                    <P id = "contentLength" text = {`${inputLengthState.length}/200`}/>
                </div>
                <Button text = "게시글 등록" name = "boardUpload"/>
            </div>
        </main>
    )
}

export default BoardWritePage