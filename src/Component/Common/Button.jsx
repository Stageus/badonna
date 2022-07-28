import React from "react"
import Img from "./Img"
import { useDispatch } from "react-redux"
import { login, join, profile, home, board, address, addressSearch, addressDetail, comment, reCommentInput, reCommentUpload, boardWrite, commentUpload } from "../../Redux/Action/action"


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
            case "boardWrite":
                dispatch(boardWrite())
                break
            case "profile":
                dispatch(profile())
                break
            case "comment":
                dispatch(comment(props.boardNum))
                break
            case "commentUpload":
                dispatch(commentUpload())
                break
            case "reCommentInput":
                dispatch(reCommentInput(props.commentNum, props.reCommentNum))
                break
            case "reCommentInputUpload":
                dispatch(reCommentUpload(props.cancel))
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