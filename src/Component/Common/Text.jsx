import React from "react"
import { useDispatch } from "react-redux"
import { commentInputText, reCommentInputText } from "../../Redux/Action/commentAction"
import { joinIdInput, joinIdCheckInput, joinPwInput, joinPwCheckInput,joinTelMiddleInput, joinTelLastInput, joinNameInput } from "../../Redux/Action/joinAction"
import { boardAddressText, boardRecruitText, boardTitleText, } from "../../Redux/Action/boardAction"

const Text = (props) => {

    const dispatch = useDispatch()

    const onChangeEvent = (event) => {
        switch(props.name){
            case "joinIdInput":
                dispatch(joinIdInput(event.target.value))
                break
            case "joinIdCheckInput":
                dispatch(joinIdCheckInput(event.target.value))
                break
            case "joinPwInput":
                dispatch(joinPwInput(event.target.value))
                break
            case "joinPwCheckInput":
                dispatch(joinPwCheckInput(event.target.value))
                break
            case "joinTelMiddleInput":
                dispatch(joinTelMiddleInput(event.target.value))
                break
            case "joinTelLastInput":
                dispatch(joinTelLastInput(event.target.value))
                break
            case "joinNameInput":
                dispatch(joinNameInput(event.target.value))
                break
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
            case "idCheckText":
                dispatch(idCheckText(event.target.value))
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