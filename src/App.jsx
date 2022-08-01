import React from "react"
import Topbar from "./Component/Topbar/Topbar"
import MainPage from "./Component/Main/MainPage"
import style from "./PublicStyle.module.scss"
import Dialog from "./Component/Main/Dialog"

const App = () => {

    return (
        <React.Fragment>
            <Topbar/>          
            <MainPage/>
            <Dialog/>       
        </React.Fragment>
    )
}

export default App