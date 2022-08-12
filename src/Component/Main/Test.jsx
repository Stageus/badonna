import React from "react"
import { useSelector } from "react-redux"
import Button from "../Common/Button"
import style from "./SCSS/Test.module.scss"

const Test = () => {

    const infoState = useSelector(state => state.test.info)
    if(infoState.length === undefined){
        return(
            <main id = {style.main}>
                <div id = {style.home}>
                    this is test server
                </div>
                <Button text = "go test action" name = "test"/>
            </main>
        )
    }
    return(
        <main id = {style.main}>
            {
                infoState&&infoState.map(element => {
                    return <div>
                        <div>
                           userId: {element.userId}
                        </div>
                        <div>
                           id: {element.id}
                        </div>
                        <div>
                           title: {element.title}
                        </div>
                        <div>
                           body: {element.body}
                        </div>
                    </div>
                })
            }
            <Button text = "go test action" name = "test"/>
        </main>
    )
}

export default Test