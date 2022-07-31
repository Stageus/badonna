import React from "react"
import Img from "./Img"
import { useDispatch } from "react-redux"
import { addressSearch, addressDetail, comment, reCommentInput, reCommentUpload, commentUpload, boardUpload, moreView } from "../../Redux/Action/action"


const Button = (props) => {

    const dispatch = useDispatch()
    
    const onClickEvent = () => {
        switch(props.name){
            case "boardUpload":
                dispatch(boardUpload())
                break
            case "commentUpload":
                dispatch(commentUpload(props.boardNum))
                break
            case "reCommentInput":
                dispatch(reCommentInput(props.commentNum, props.reCommentNum))
                break
            case "reCommentInputUpload":
                dispatch(reCommentUpload(props.cancel, props.commentNum))
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