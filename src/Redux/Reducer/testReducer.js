import useFetch from "../../Module/fetch"
import { TEST } from "../Action/testAction"

const initState = {
    info: []
}

const testReducer = (state = initState, action) => {
    switch(action.type){
        
        case TEST:
            const result = action.info
            const info = [...state.info]
            result.forEach(element => {
              info.push(element)
            })
            return{
                ...state,
                info: info
            }
        default:
            return state
    }
}

export default testReducer