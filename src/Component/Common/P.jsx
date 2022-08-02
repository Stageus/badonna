import React from "react"

const P = (props) => {

    return (
        <p id = {props.id} style = {props.style}>{props.text}</p>
    )
}

export default P