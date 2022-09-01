import { addressGet } from "../../Module/fetch"

export const SCROLL = "SCROLL"
export const ADDRESS = "ADDRESS"
export const TERMS_OF_SERVICE = "TERMS_OF_SERVICE"
export const ID_CHECK = "ID_CHECK"
export const TEL_CHECK = "TEL_CHECK"

export const ADDRESS_SEARCH = "ADDRESS_SEARCH"
export const ADDRESS_DETAIL = "ADDRESS_DETAIL"
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
const address = () => async dispatch => {
    const addressList = await addressGet()
    dispatch({
        type: ADDRESS,
        addressList: addressList
    })
}
const addressSearch = () => {
    return{
        type: ADDRESS_SEARCH
    }
}
const addressDetail = () => {
    return{
        type: ADDRESS_DETAIL
    }
}
const dialogClose = (sort = "", text = "") => {
    return{
        type: DIALOG_CLOSE,
        text: text,
        sort: sort
    }
}
const moreView = (num, text) => {
    return{
        type: MORE_VIEW,
        num: num,
        text: text
    }
}



export { termsOfService, changeScroll, address, addressSearch, addressDetail, dialogClose, 
         moreView, idCheck, telCheck }