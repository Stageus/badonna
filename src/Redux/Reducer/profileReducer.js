import { PROFILE } from "../Action/profileAction"

const initState = {
    user: {
        id: "",
        phonenum: "",
        name: "",
        place: []
    },
}

const profileReducer = (state = initState, action) => {
    switch(action.type){
        case "persist/REHYDRATE":
            return{
                ...state,
                user: action.payload.profile.user
            }
        case PROFILE:
            return{
                ...state,
                user: action.user
            }
        default:
            return{
                ...state
            }
    }
}

export default profileReducer