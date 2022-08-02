export const ID_INPUT = "ID_INPUT"
export const PW_INPUT = "PW_INPUT"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

const loginId = (text) => {
    return {
        type: ID_INPUT,
        text: text
    }
}
const loginPw = (text) => {
    return {
        type: PW_INPUT,
        text: text
    }
}
const login = () => {
    return {
        type: LOGIN,
    }
}
const logout = () => {
    return{
        type: LOGOUT
    }
}
export { loginId, loginPw, login, logout }