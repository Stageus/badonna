import React from "react"
import Topbar from "./Component/Topbar/Topbar"
import Main from "./Component/Main/Main"
import style from "./PublicStyle.module.scss" 

const App = () => {

    return (
        <React.Fragment>
            <Topbar/>
            <Main/>
        </React.Fragment>
    )
}

export default App