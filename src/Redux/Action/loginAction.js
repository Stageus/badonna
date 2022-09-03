import { loginPost } from "../../Module/fetch"
import swal from "sweetalert2"

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
const login = (id = null, pw = null) => async dispatch => {
    const bool = await loginPost(id, pw)

    if(id === null || pw === null || !bool){
        swal.fire({
            width: "500px",
            title: "로그인 실패",
            icon: "error",
            confirmButtonText: "확인",
            confirmButtonColor: "#ff7396",
            html: "아이디 또는 비번이 틀립니다.<style>.swal2-html-container{margin: 0; height: fit-content;}</style>"
        })
        return
    }
    dispatch({
        type: LOGIN,
        bool: bool
    })
}
const logout = () => {
    return{
        type: LOGOUT
    }
}
export { loginId, loginPw, login, logout }