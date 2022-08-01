import { TERMS_OF_SERVICE } from "../Action/joinAction"

const initState = {
    termsOfService: false,
    joinIdInput: "",
    joinPwInput: "",
    joinPwCheckInput: "",
    joinTelMiddleInput: "",
    joinTelLastInput: "",
    joinNameInput: "",
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
        default:
            return{
                ...state
            }
    }
}

export default joinReducer