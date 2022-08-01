import React from "react"
import Img from "./Img"
import { useDispatch } from "react-redux"
import { address, addressSearch, addressDetail, moreView, idCheck, telCheck } from "../../Redux/Action/action"
import { boardUpload, } from "../../Redux/Action/boardAction"
import { reCommentInput, reCommentUpload, commentUpload, } from "../../Redux/Action/commentAction"


const Button = (props) => {

    const dispatch = useDispatch()
    
    const onClickEvent = () => {
        switch(props.name){
            case "address":
                dispatch(address())
                break
            case "idCheckDialog":
                dispatch(idCheck())
                break
            case "telCheckDialog":
                dispatch(telCheck())
                break
            case "boardUpload":
                dispatch(boardUpload(props.userName))
                break
            case "commentUpload":
                dispatch(commentUpload(props.boardNum, props.userName))
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
                if(props.commentNum === undefined && props.reCommentNum === undefined){
                    dispatch(moreView(props.boardNum, props.moreViewName))
                    break
                }else if(props.reCommentNum === undefined && props.boardNum === undefined){
                    dispatch(moreView(props.commentNum, props.moreViewName))
                    break
                }else if(props.commentNum === undefined && props.boardNum === undefined){
                    dispatch(moreView(props.reCommentNum, props.moreViewName))
                    break
                }
                break
            case "boardEdit":
                break
            case "boardDelete":
                break
            case "commentEdit":
                break
            case "commentDelete":
                break
            case "reCommentEdit":
                break
            case "reCommentDelete":
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