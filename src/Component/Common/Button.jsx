import React from "react"
import Img from "./Img"
import { useDispatch } from "react-redux"
import { login, join, profile, home, board } from "../../Redux/Action/action"

const Button = (props) => {

    const dispatch = useDispatch()

    const onClickEvent = () => {
        switch(props.name){
            case "login":
                dispatch(login())
                break
            case "join":
                dispatch(join())
                break
            case "address":
                break
            case "board":
                dispatch(board())
                break
            case "profile":
                dispatch(profile())
                break
            default:
                dispatch(home())
        }
    }

    return (
        <button id = {props.id} onClick = {onClickEvent}>
            {props.text}
        </button>
    )
}

export default Button