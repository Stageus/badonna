import { getCookie } from "../../Module/cookie"
import { profileGet } from "../../Module/fetch"
import { PROFILE } from "../Action/profileAction"

const initState = {
    user: {
        id: "",
        pw: "",
        name: "",
        phonenum:"",
        date: "",
    },
}

const profileReducer = (state = initState, action) => {
    switch(action.type){
        case PROFILE:
            const user = profileGet(getCookie("access-token"), getCookie("id"))
            
            return{
                ...state,
                user: user
            }
        default:
            return{
                ...state
            }
    }
}

export default profileReducer