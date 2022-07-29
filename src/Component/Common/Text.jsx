import React from "react"
import { useDispatch } from "react-redux"
import { boardAddressText, boardRecruitText, boardTitleText, commentInputText, reCommentInputText } from "../../Redux/Action/action"

const Text = (props) => {

    const dispatch = useDispatch()

    const onChangeEvent = (event) => {
        switch(props.name){
            case "comment":
                dispatch(commentInputText(event.target.value))
                break
            case "reComment":
                dispatch(reCommentInputText(event.target.value))
                break
            case "boardTitle":
                dispatch(boardTitleText(event.target.value))
                break
            case "boardAddress":
                dispatch(boardAddressText(event.target.value))
                break
            case "boardRecruit":
                dispatch(boardRecruitText(event.target.value))
                break
            case "address":
                break
        }
    }

    return (
        <input id = {props.id} type="text" placeholder = {props.placeholder} onChange = {onChangeEvent} maxLength = {props.maxLength}>
            {props.text}
        </input>
    )
}

export default Text