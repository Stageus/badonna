import { TERMS_OF_SERVICE, ID_CHECK_INPUT, ID_INPUT, PW_CHECK_INPUT, PW_INPUT, TEL_LAST_INPUT, TEL_MIDDLE_INPUT, NAME_INPUT, idInput, JOIN, ID_CHECK_BUTTON, idCheckInput } from "../Action/joinAction"
// import { duplicateIdPost, joinPost } from "../../Module/fetch"
import swal from "sweetalert2"

const initState = {
    termsOfService: false,
    idInput: "",
    idCheckInput: "",
    idCheck: false,
    isSameId: false,
    isOnlyId: false,
    pwInput: "",
    pwCheckInput: "",
    isSamePw: false,
    pwCheck: false,
    telMiddleInput: "",
    telLastInput: "",
    telCheck: false,
    nameInput: "",
    nameCheck: false
}

const joinReducer = ( state = initState, action) => {

    switch( action.type ){
        case TERMS_OF_SERVICE:
            if(action.cancel){
                return{
                    ...state,
                    termsOfService: false
                }
            }
            return{
                ...state,
                termsOfService: true,
            }
        case ID_INPUT:
            if(action.text.length < 6){
                return{
                    ...state,
                    idInput: action.text,
                    idCheck: false
                }
            }
            return{
                ...state,
                idInput: action.text,
                idCheck: true
            }
        case ID_CHECK_BUTTON:
            // if(duplicateIdPost(state.idCheckInput)){
            //     return{
            //         ...state,
            //         isSameId: true
            //     }
            // }
            swal.fire({
                width: "500px",
                title: "중복 없음",
                icon: "success",
                confirmButtonText: "확인",
                confirmButtonColor: "#ff7396",
                html: "아이디 중복 체크 완료.<style>.swal2-html-container{margin: 0; height: fit-content;}</style>"
            })
            return{
                ...state,
                isSameId: true
            }
        case PW_INPUT:
            if(action.text.length < 6){
                return{
                    ...state,
                    pwInput: action.text,
                    pwCheck: false
                }
            }
            return{
                ...state,
                pwInput: action.text,
                pwCheck: true
            }
        case PW_CHECK_INPUT:
            if(action.text !== state.pwInput){
                return{
                    ...state,
                    pwCheckInput: action.text,
                    isSamePw: false
                }
            }
            return{
                ...state,
                pwCheckInput: action.text,
                isSamePw: true
            }
        case TEL_MIDDLE_INPUT:
            return{
                ...state,
                telMiddleInput: action.text
            }
        case TEL_LAST_INPUT:
            return{
                ...state,
                telLastInput: action.text
            }
        case NAME_INPUT:
            if(action.text.length > 2){
                return{
                    ...state,
                    nameInput: action.text,
                    nameCheck: true
                }
            }
            return{
                ...state,
                nameInput: action.text,
                nameCheck: false
            }
        case JOIN:
            joinPost()
            return{
                ...state
            }
        default:
            return{
                ...state
            }
    }
}

export default joinReducer