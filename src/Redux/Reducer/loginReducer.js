import { delCookie, getCookie, setCookie, } from "../../Module/cookie"
import { loginPost } from "../../Module/fetch"
import { ID_INPUT, PW_INPUT, LOGIN, LOGOUT } from "../Action/loginAction"

let bool = true
if(getCookie("access-token") === null || getCookie("access-token") === ""){
    bool = false
}

const initState = {
    idInput: "",
    idCheck: null,
    pwInput: "",
    pwCheck: null,
    topbar: bool
}

const loginReducer = (state = initState, action) => {
    switch(action.type){
        case ID_INPUT:
            return{
                ...state,
                idInput: action.text,
                idCheck: true
            }
        case PW_INPUT:
            return{
                ...state,
                pwInput: action.text,
                pwCheck: true
            }
        case LOGIN:
            if(state.idCheck && state.pwCheck){
                loginPost(state.idInput, state.pwInput)
                setCookie("id", state.idInput)

                return{
                    ...state,
                    topbar: true
                }
            }
            return{
                ...state,
                idCheck: false,
                pwCheck: false
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