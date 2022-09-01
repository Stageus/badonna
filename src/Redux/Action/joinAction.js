import { duplicateIdPost } from "../../Module/fetch"

export const TERMS_OF_SERVICE = "TERMS_OF_SERVICE"
export const ID_INPUT = "ID_INPUT"
export const ID_CHECK_INPUT = "ID_CHECK_INPUT"
export const ID_CHECK_BUTTON = "ID_CHECK_BUTTON"
export const PW_INPUT =  "PW_INPUT"
export const PW_CHECK_INPUT = "PW_CHECK_INPUT"
export const TEL_MIDDLE_INPUT = "TEL_MIDDLE_INPUT"
export const TEL_LAST_INPUT = "TEL_LAST_INPUT"
export const NAME_INPUT = "NAME_INPUT"
export const JOIN = "JOIN"

const termsOfService = (cancel = false) => {
    return {
        type: TERMS_OF_SERVICE,
        cancel: cancel
    }
}
const idInput = (text) => {
    return {
        type: ID_INPUT,
        text: text
    }
}
const idCheckInput = (text) => {
    return {
        type: ID_CHECK_INPUT,
        text: text
    }
}
const idCheckButton = (id = "") => async dispatch => {
    const bool = await duplicateIdPost(id)
    dispatch({
        type: ID_CHECK_BUTTON,
        bool: bool
    })
}
const pwInput = (text) => {
    return {
        type: PW_INPUT,
        text: text
    }
}
const pwCheckInput = (text) => {
    return {
        type: PW_CHECK_INPUT,
        text: text
    }
}
const telMiddleInput = (text) => {
    return {
        type: TEL_MIDDLE_INPUT,
        text: text
    }
}
const telLastInput = (text) => {
    return {
        type: TEL_LAST_INPUT,
        text: text
    }
}
const nameInput = (text) => {
    return {
        type: NAME_INPUT,
        text: text
    }
}
const join = () => {
    return{
        type: JOIN,
    }
}

export { termsOfService, idInput, idCheckInput, idCheckButton,
         pwInput, pwCheckInput, 
         telMiddleInput, telLastInput, 
         nameInput, join }