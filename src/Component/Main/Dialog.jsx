import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addressDelCheck, dialogClose } from "../../Redux/Action/action"
import style from "./SCSS/Dialog.module.scss"
import H1 from "../Common/H1"
import H2 from "../Common/H2"
import P from "../Common/P"
import Button from "../Common/Button"
import Text from "../Common/Text"
import DaumPostCode from "react-daum-postcode"
import { idInput } from "../../Redux/Action/joinAction"

const Dialog = () => {

    const userAddressState = useSelector(state => state.home.addressList)
    const addressState = useSelector(state => state.home.address)
    const addressCheckBoxState = useSelector(state => state.home.addressCheckBox)
    const addressClickState = useSelector(state => state.home.addressClick)
    const addressSearchState = useSelector(state => state.home.addressSearch)
    const addressCheckStatusState = useSelector(state => state.home.addressCheckStatus)
    const idCheckState = useSelector(state => state.home.idCheck)
    const telCheckState = useSelector(state => state.home.telCheck)
    const idInputState = useSelector(state => state.join.idInput)
    const addressDelState = useSelector(state => state.home.addressDel)
    const dispatch = useDispatch()

    const overlayClickEvent = () => {
        dispatch(dialogClose())
        dispatch(idInput(""))
    }
    const checkEvent = (event) => {
        if(addressCheckStatusState && addressDelState === event.target.id){
            dispatch(addressDelCheck(false, event.target.value))
            document.getElementById(event.target.id).checked = false
            return
        }
        dispatch(addressDelCheck(true, event.target.value))
    }
    const oncomplete = (data) => {
        dispatch(dialogClose("address", data.address))
    }
    
    let overlayDisplayStyle = {
        display: "none"
    }
    if(addressState || addressSearchState || idCheckState || telCheckState){
        overlayDisplayStyle.display = "flex"
    }

    return (
            <div id = {style.background} style = {overlayDisplayStyle}>
                <div id = {style.dialogBox}>
                    {/* 주소 즐찾 창 */}
                    {
                        addressState &&
                        <div>
                            <div id = {style.addressInput}>
                                <H1 text = "주소 즐겨찾기"/>
                                <Button text = "주소 입력" name = "addressSearch"/>
                                <H2 text = "등록된 주소"/>
                            </div>
                            <div id = {style.address}>
                                {
                                    userAddressState === undefined || userAddressState === null?
                                    <P/>:
                                    addressClickState ?
                                    userAddressState.map((element, index) => 
                                        <div key = {index} id = {style.addressButtonBox}>
                                            <Button key = {index} text = {element.place} name = "userRegAddress"/>
                                        </div>
                                    ) :
                                    userAddressState.map((element, index) => {
                                        return(
                                            <div key = {index} id = {style.addressButtonBox}>
                                                {
                                                    addressCheckBoxState && <input type="radio" id = {element.place_num} name = "addressList" value = {element.place_num} onClick = {checkEvent}/>
                                                }
                                                <Button text = {element.place} disabled/>
                                            </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                            {
                                addressClickState === true ?
                                <></>:
                                addressCheckBoxState === true ?
                                addressDelState === null || addressDelState === undefined ?
                                <Button id = {style.addressDelete} text = "취소" name = "addressDelete"/> :
                                <Button id = {style.addressDelete} text = "삭제" name = "addressDelete" addressDel = {addressDelState}/> :
                                <Button id = {style.addressDelete} text = "주소 삭제" name = "addressDelete"/>
                            }
                        </div>
                    }
                    {/* 주소 검색 창 */}
                    {
                        addressSearchState &&
                        <div>
                            <div id = {style.addressSearch}>
                                <Button text = "<" name = "address"/>
                                <H1 text = "주소 검색"/>
                            </div>
                            <DaumPostCode onComplete = {oncomplete}/>
                        </div>
                    }
                    {/* 아이디 중복 체크 창 */}
                    {
                        idCheckState &&
                        <div>
                            <div id = {style.idCheck}>
                                <H1 text = "ID 중복체크"/>
                            </div>
                            <div id = {style.idCheckInput}>
                                <Text name = "idInput" maxLength = "12"/>
                                {
                                    idInputState.length > 6 ?
                                    <P text = ""/>:
                                    <P id = {style.hiddenText} text = "6자 이상 입력 해주세요."/>
                                }
                                <Button text = "중복 체크" name = "idCheck" idInput = {idInputState}/>
                            </div>
                        </div>
                    }
                </div>
            <div id = {style.overlay} onClick = {overlayClickEvent} style = {overlayDisplayStyle}></div>
        </div>
    )
}

export default Dialog