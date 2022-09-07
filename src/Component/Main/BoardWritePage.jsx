import React from "react"
import style from "./SCSS/Board.module.scss"
import Text from "../Common/Text"
import Button from "../Common/Button"
import P from "../Common/P"
import { useSelector, useDispatch } from "react-redux"
import { boardContentText } from "../../Redux/Action/boardAction"
import { Link } from "react-router-dom"

const BoardWritePage = () => {

    const dispatch = useDispatch()
    const titleState = useSelector(state => state.board.boardInput.title)
    const addressState = useSelector(state => state.board.boardInput.location)
    const recruitState = useSelector(state => state.board.boardInput.recruit)
    const contentState = useSelector(state => state.board.boardInput.content)
    const boardNumState = useSelector(state => state.board.boardInput.boardNum)
    const inputEvent = (event) => {
        dispatch(boardContentText(event.target.value))
    }

    return (
        <main>
            <div id = {style.boardWriteBox}>
                <div id = {style.titleBox}>
                    <Text placeholder = "제목" name = "boardTitle" maxLength = "20" value = {titleState}/>
                    <div id = {style.addressBox}>
                        <Text id = {style.addressInput} placeholder = "주소 직접 입력" name = "boardAddress" maxLength = "20" value = {addressState}/>
                        <Button text = "주소 즐겨찾기" name = "addressSimple"/>
                    </div>
                    <div id = {style.recruitBox}>
                        <Text id = {style.recruit} placeholder = "모집인원" name = "boardRecruit" maxLength = "2" value = {recruitState}/>
                        <P text = "명"/>
                    </div>
                </div>
                <div id = {style.contentBox}>
                    <textarea id = "content" placeholder = "내용" onChange = {inputEvent} maxLength = "200" value = {contentState}></textarea>
                    <P id = "contentLength" text = {`${contentState.length}/200`}/>
                </div>
                {
                    boardNumState === null ?
                    <Link to = "/board">
                        <Button text = "게시글 등록" name = "boardUpload" title = {titleState} address = {addressState} recruit = {recruitState} content = {contentState} boardNum = {boardNumState}/>
                    </Link> :
                    <Link to = "/board">
                        <Button text = "게시글 수정" name = "boardUpload" title = {titleState} address = {addressState} recruit = {recruitState} content = {contentState} boardNum = {boardNumState}/>
                    </Link>
                }
                
            </div>
        </main>
    )
}

export default BoardWritePage