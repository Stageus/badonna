import React from "react"
import style from "./SCSS/MoreView.module.scss"

const MoreView = () => {
    
    return (
        <React.Fragment>
            <button id = {style.moreView}>...</button>
            <ul id = {style.hiddenButtons}>
                <li>
                    <button>게시물 수정</button>
                </li>
                <li>
                    <button>게시물 삭제</button>
                </li>
            </ul>
        </React.Fragment>
    )
}

export default MoreView