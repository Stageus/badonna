import { delCookie } from "../../Module/cookie"
import { ID_INPUT, PW_INPUT, LOGIN, LOGOUT } from "../Action/loginAction"

const initState = {
    idInput: "",
    pwInput: "",
    idCheck: false,
    pwCheck: false,
    topbar: false
}

const loginReducer = (state = initState, action) => {
    switch(action.type){
        case ID_INPUT:
            return{
                ...state,
                idInput: action.text,
                idCheck: state.idInput.length > 0 ? true : false
            }
        case PW_INPUT:
            return{
                ...state,
                pwInput: action.text,
                pwCheck: state.pwInput.length > 0 ? true : false
            }
        case LOGIN:
            if(state.idCheck === true && state.pwCheck === true){
                if(action.bool){
                    return{
                        ...state,
                        topbar: true
                    }
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
                topbar: false,
                idCheck: false,
                pwCheck: false
            }
        default:
            return{
                ...state
            }
    }
}

export default loginReducer