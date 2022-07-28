import React from "react"
import { useDispatch } from "react-redux"
import { reCommentInputText } from "../../Redux/Action/action"

const Text = (props) => {

    const dispatch = useDispatch()

    const onChangeEvent = (event) => {
        switch(props.name){
            case "comment":
                dispatch()
                break
            case "reComment":
                dispatch(reCommentInputText(event.target.value))
                break
            case "board":
                break
            case "address":
                break
        }
    }

    return (
        <input type="text" placeholder = {props.placeholder} onChange = {onChangeEvent}>
            {props.text}
        </input>
    )
}

export default Text