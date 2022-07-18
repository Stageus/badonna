import React from "react"
import ButtonBox from "./ButtonBox"
import Logo from "./Logo"
import style from "./SCSS/Topbar.module.scss"

const Topbar = () => {

    return(
        <nav>
            <Logo/>
            <ButtonBox/>
        </nav>
    )
}

export default Topbar