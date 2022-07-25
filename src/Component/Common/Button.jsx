import React from "react"
import Img from "./Img"
import { useDispatch, useSelector } from "react-redux"
import { login, join, profile, home, board, comment, address, reCommentWrite, addressSearch, addressDetail } from "../../Redux/Action/action"

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
                dispatch(address())
                break
            case "board":
                dispatch(board())
                break
            case "profile":
                dispatch(profile())
                break
            case "comment":
                dispatch(comment(props.boardNum))
                break
            case "reCommentWrite":
                dispatch(reCommentWrite(props.commentNum, props.reCommentNum))
                break
            case "addressSearch":
                dispatch(addressSearch())
                break
            case "addressDetail":
                dispatch(addressDetail())
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