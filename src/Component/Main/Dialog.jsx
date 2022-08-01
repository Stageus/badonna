import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { dialogClose } from "../../Redux/Action/action"
import style from "./SCSS/Dialog.module.scss"
import H1 from "../Common/H1"
import H2 from "../Common/H2"
import P from "../Common/P"
import Button from "../Common/Button"
import Text from "../Common/Text"

const Dialog = () => {

    const userAddressState = useSelector(state => state.profile.user.address)
    const addressState = useSelector(state => state.home.address)
    const addressSearchState = useSelector(state => state.home.addressSearch)
    const addressDetailState = useSelector(state => state.home.addressDetail)
    const idCheckState = useSelector(state => state.home.idCheck)
    const telCheckState = useSelector(state => state.home.telCheck)
    const dispatch = useDispatch()

    const overlayClickEvent = () => {
        dispatch(dialogClose())
    }
    
    let overlayDisplayStyle = {
        display: "none"
    }
    if(addressState || addressSearchState || addressDetailState || idCheckState || telCheckState){
        overlayDisplayStyle.display = "flex"
    }

    if(addressState){
        return (
            <React.Fragment>
                <div id = {style.background} style = {overlayDisplayStyle}>
                    <div id = {style.dialogBox}>
                        <div id = {style.addressInput}>
                            <H1 text = "주소 즐겨찾기"/>
                            <Button text = "주소 입력" name = "addressSearch"/>
                            <H2 text = "등록된 주소"/>
                        </div>
                        <div id = {style.address}>
                            {
                                userAddressState.map(element => <P text = {element}/>)
                            }
                        </div>
                        <Button text = "주소 삭제" name = "addressDelete"/>
                    </div>
                </div>
                <div id = {style.overlay} onClick = {overlayClickEvent} style = {overlayDisplayStyle}></div>
            </React.Fragment>
        )
    }else if(addressSearchState){
        return (
            <React.Fragment>
                <div id = {style.background} style = {overlayDisplayStyle}>
                    <div id = {style.dialogBox}>
                        <div id = {style.addressSearch}>
                            <Button text = "<" name = "address"/>
                            <H1 text = "주소 검색"/>
                        </div>
                        <Text/>
                        <div id = {style.addressSearchResult}>
                            <Button text = "api" name = "addressDetail"/>
                        </div>
                    </div>
                </div>
                <div id = {style.overlay} onClick = {overlayClickEvent} style = {overlayDisplayStyle}></div>
            </React.Fragment>
        )
    }else if(addressDetailState){
        return (
            <React.Fragment>
                <div id = {style.background} style = {overlayDisplayStyle}>
                    <div id = {style.dialogBox}>
                        <div id = {style.addressDetail}>
                            <Button text = "<" name = "addressSearch"/>
                            <H1 text = "상세 주소"/>
                        </div>
                        <div id = {style.addressDetailInput}>
                            <P text = "apiText 가져다 쓰기"/>
                            <Text/>
                            <Button text = "등록"/>
                        </div>
                    </div>
                </div>
                <div id = {style.overlay} onClick = {overlayClickEvent} style = {overlayDisplayStyle}></div>
            </React.Fragment>
        )
    }else if (idCheckState){
        return (
            <React.Fragment>
                <div id = {style.background} style = {overlayDisplayStyle}>
                    <div id = {style.dialogBox}>
                        <div id = {style.idCheck}>
                            <H1 text = "ID 중복체크"/>
                        </div>
                        <div id = {style.idCheckInput}>
                            <Text name = "idCheckText"/>
                            <P id = {style.hiddenText} text = "사용 가능한 아이디 입니다."/>
                            <Button text = "중복 체크" name = "idCheck"/>
                        </div>
                    </div>
                </div>
                <div id = {style.overlay} onClick = {overlayClickEvent} style = {overlayDisplayStyle}></div>
            </React.Fragment>
        )
    }else if(telCheckState){
        return (
            <React.Fragment>
                <div id = {style.background} style = {overlayDisplayStyle}>
                    <div id = {style.dialogBox}>
                        <div id = {style.idCheck}>
                            <H1 text = "ID 중복체크"/>
                        </div>
                        <div id = {style.idCheckInput}>
                            <Text name = "idCheckText"/>
                            <P id = {style.hiddenText} text = "사용 가능한 아이디 입니다."/>
                            <Button text = "중복 체크" name = "idCheck"/>
                        </div>
                    </div>
                </div>
                <div id = {style.overlay} onClick = {overlayClickEvent} style = {overlayDisplayStyle}></div>
            </React.Fragment>
        )
    }
}

export default Dialog