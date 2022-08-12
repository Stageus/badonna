// import { getCookie } from "../../Module/cookie"
// import { profileGet } from "../../Module/fetch"
import useFetch from "../../Module/fetch"
import { PROFILE } from "../Action/profileAction"

const initState = {
    user: {
        id: "",
        userId: "",
        title: "",
        body: "",
    },
}

const profileReducer = (state = initState, action) => {
    switch(action.type){
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