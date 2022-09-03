import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { address, addressSearch, addressDetail, moreView, idCheck, telCheck, dialogClose } from "../../Redux/Action/action"
import { board, boardDelete, boardEditPage, boardUpload, } from "../../Redux/Action/boardAction"
import { reCommentInput, reCommentUpload, commentUpload, comment, commentDelete, } from "../../Redux/Action/commentAction"
import { idCheckButton, join, } from "../../Redux/Action/joinAction"
import { login, logout } from "../../Redux/Action/loginAction"
import { profile } from "../../Redux/Action/profileAction"

const Button = (props) => {
    
    const dispatch = useDispatch()
    const onClickEvent = () => {
        switch(props.name){
            case "loginPage":
                break
            case "logout":
                dispatch(logout())
                break
            case "boardPage":
                dispatch(board())
                break
            case "profilePage":
                dispatch(profile())
                break
            case "commentPage":
                dispatch(comment(props.boardNum))
                break
            case "login":
                dispatch(login(props.idInput, props.pwInput))
                break
            case "address":
                dispatch(address())
                break
            case "idCheckDialog":
                dispatch(idCheck())
                break
            case "telCheckDialog":
                dispatch(telCheck())
                break
            case "idCheck":
                dispatch(idCheckButton(props.idInput))
                dispatch(dialogClose())
                break
            case "telCheck":
                dispatch(dialogClose())
                break
            case "boardUpload":
                dispatch(boardUpload(props.title, props.address, props.recruit, props.content, props.boardNum))
                break
            case "commentUpload":
                dispatch(commentUpload(props.boardNum, props.contents))
                break
            case "reCommentInput":
                dispatch(reCommentInput(props.commentNum, props.reCommentNum))
                break
            case "reCommentUpload":
                dispatch(reCommentUpload(props.cancel, props.commentNum, props.userName))
                break
            case "addressSearch":
                dispatch(addressSearch())
                break
            case "addressDetail":
                dispatch(addressDetail())
                break
            case "moreView":
                if(props.moreViewName === "board"){
                    dispatch(moreView(props.boardNum, props.moreViewName))
                    break
                }else if(props.moreViewName === "comment"){
                    dispatch(moreView(props.commentNum, props.moreViewName))
                    break
                }else if(props.moreViewName === "reComment"){
                    dispatch(moreView(props.reCommentNum, props.moreViewName))
                    break
                }
                break
            case "boardEdit":
                dispatch(boardEditPage(props.boardNum))
                break
            case "boardDelete":
                dispatch(boardDelete(props.boardNum))
                break
            case "commentEdit":
                break
            case "commentDelete":
                dispatch(commentDelete(props.boardNum, props.commentNum))
                break
            case "reCommentEdit":
                break
            case "reCommentDelete":
                break
            case "joinButton":
                dispatch(join())
                break
            default:
                console.log("Error")
        }
    }

    return (
        <button id = {props.id} onClick = {onClickEvent}>
            {props.text}
        </button>
    )
}

export default Button