import { addressGet, addressPut, profileGet } from "../../Module/fetch"

export const SCROLL = "SCROLL"
export const ADDRESS = "ADDRESS"
export const TERMS_OF_SERVICE = "TERMS_OF_SERVICE"
export const ID_CHECK = "ID_CHECK"
export const TEL_CHECK = "TEL_CHECK"

export const ADDRESS_SEARCH = "ADDRESS_SEARCH"
export const ADDRESS_DELETE = "ADDRESS_DELETE"
export const ADDRESS_DELETE_LIST = "ADDRESS_DELETE_LIST"
export const DIALOG_CLOSE = "DIALOG_CLOSE"

export const MORE_VIEW = "MORE_VIEW"

const termsOfService = (cancel = false) => {
    return {
        type: TERMS_OF_SERVICE,
        cancel: cancel
    }
}
const idCheck = () => {
    return {
        type: ID_CHECK
    }
}
const telCheck = () => {
    return {
        type: TEL_CHECK
    }
}
const changeScroll = (scroll) => {
    return {
        type: SCROLL,
        scroll: scroll
    }
}
const address = (click = false) => async dispatch => {
    const addressList = await addressGet()
    dispatch({
        type: ADDRESS,
        addressList: addressList,
        click: click
    })
}
const addressSearch = () => {
    return{
        type: ADDRESS_SEARCH
    }
}
const addressDelList = (checked, addressNum) => {
    return{
        type: ADDRESS_DELETE_LIST,
        checked: checked,
        addressNum: addressNum
    }
}
const addressDelete = (addressNumList) => {
    return{
        type: ADDRESS_DELETE,
        addressNumList: addressNumList
    }
}
const dialogClose = (sort = "", text = "") => async dispatch => {
    let data = null

    if(sort === "address"){
        await addressPut(text)
        data = await profileGet()
    }
    dispatch({
        type: DIALOG_CLOSE,
        text: text,
        sort: sort,
        data: data 
    })
}
const moreView = (num, text) => {
    return{
        type: MORE_VIEW,
        num: num,
        text: text
    }
}



export { termsOfService, changeScroll, 
         address, addressSearch, addressDelete, addressDelList, 
         idCheck, telCheck,
         dialogClose,  
         moreView, }