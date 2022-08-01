export const TERMS_OF_SERVICE = "TERMS_OF_SERVICE"
export const JOIN_ID_INPUT = "JOIN_ID_INPUT"
export const JOIN_ID_CHECK_INPUT = "JOIN_ID_CHECK_INPUT"
export const JOIN_PW_INPUT = "JOIN_PW_INPUT"
export const JOIN_PW_CHECK_INPUT = "JOIN_PW_CHECK_INPUT"
export const JOIN_TEL_MIDDLE_INPUT = "JOIN_TEL_MIDDLE_INPUT"
export const JOIN_TEL_LAST_INPUT = "JOIN_TEL_LAST_INPUT"
export const JOIN_NAME_INPUT = "JOIN_NAME_INPUT"

const termsOfService = (cancel = false) => {
    return {
        type: TERMS_OF_SERVICE,
        cancel: cancel
    }
}
const joinIdInput = (text) => {
    return {
        type: JOIN_ID_INPUT,
        text: text
    }
}
const joinIdCheckInput = (text) => {
    return {
        type: JOIN_ID_CHECK_INPUT,
        text: text
    }
}
const joinPwInput = (text) => {
    return {
        type: JOIN_PW_INPUT,
        text: text
    }
}
const joinPwCheckInput = (text) => {
    return {
        type: JOIN_PW_CHECK_INPUT,
        text: text
    }
}
const joinTelMiddleInput = (text) => {
    return {
        type: JOIN_TEL_MIDDLE_INPUT,
        text: text
    }
}
const joinTelLastInput = (text) => {
    return {
        type: JOIN_TEL_LAST_INPUT,
        text: text
    }
}
const joinNameInput = (text) => {
    return {
        type: JOIN_NAME_INPUT,
        text: text
    }
}

export { termsOfService, joinIdInput, joinIdCheckInput,
         joinPwInput, joinPwCheckInput, 
         joinTelMiddleInput, joinTelLastInput, 
         joinNameInput }