import { delCookie, getCookie, setCookie, } from "../../Module/cookie"
import { loginPost } from "../../Module/fetch"
import { ID_INPUT, PW_INPUT, LOGIN, LOGOUT } from "../Action/loginAction"

let bool = true
if(getCookie("access-token") === null || getCookie("access-token") === ""){
    bool = false
}

const initState = {
    idInput: "",
    pwInput: "",
    topbar: bool
}

const loginReducer = (state = initState, action) => {
    switch(action.type){
        case ID_INPUT:
            return{
                ...state,
                idInput: action.text
            }
        case PW_INPUT:
            return{
                ...state,
                pwInput: action.text
            }
        case LOGIN:
            loginPost(state.idInput, state.pwInput)
            setCookie("id", state.idInput)
            return{
                ...state,
                topbar: true
            }
        case LOGOUT:
            delCookie("access-token")
            delCookie("id")
            return{
                ...state,
                topbar: false
            }
        default:
            return{
                ...state
            }
    }
}

export default loginReducer