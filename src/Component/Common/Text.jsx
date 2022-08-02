import React from "react"
import { useDispatch } from "react-redux"
import { commentInputText, reCommentInputText } from "../../Redux/Action/commentAction"
import { idInput, idCheckInput, pwInput, pwCheckInput,telMiddleInput, telLastInput, nameInput } from "../../Redux/Action/joinAction"
import { boardAddressText, boardRecruitText, boardTitleText, } from "../../Redux/Action/boardAction"
import { loginId, loginPw } from "../../Redux/Action/loginAction"

const Text = (props) => {

    const dispatch = useDispatch()

    const onChangeEvent = (event) => {
        switch(props.name){
            case "loginId":
                dispatch(loginId(event.target.value))
                break
            case "loginPw":
                dispatch(loginPw(event.target.value))
                break
            case "idInput":
                dispatch(idInput(event.target.value))
                break
            case "idCheckInput":
                dispatch(idCheckInput(event.target.value))
                break
            case "pwInput":
                dispatch(pwInput(event.target.value))
                break
            case "pwCheckInput":
                dispatch(pwCheckInput(event.target.value))
                break
            case "telMiddleInput":
                dispatch(telMiddleInput(event.target.value))
                break
            case "telLastInput":
                dispatch(telLastInput(event.target.value))
                break
            case "nameInput":
                dispatch(nameInput(event.target.value))
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