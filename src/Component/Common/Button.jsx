import React from "react"
import Img from "./Img"
import { useDispatch } from "react-redux"
import { login, join, adress, profile, home } from "../../Redux/Action/action"

const Button = (props) => {

    const dispatch = useDispatch()

    const onClickEvent = () => {
        switch(props.name){
            case "login":
                dispatch(login())
                break
            case "join":
                console.log(props.name)
                dispatch(join())
                break
            case "adress":
                dispatch(address())
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