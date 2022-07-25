import React from "react"

const Text = (props) => {

    return (
        <input type="text" placeholder = {props.placeholder}>{props.text}</input>
    )
}

export default Text