import React from "react"
import Topbar from "./Component/Topbar/Topbar"
import MainPage from "./Component/Main/MainPage"
import AddressDialog from "./Component/Main/AddressDialog"
import style from "./PublicStyle.module.scss"

const App = () => {

    return (
        <React.Fragment>
            <Topbar/>          
            <MainPage/>            
            <AddressDialog/>          
        </React.Fragment>
    )
}

export default App