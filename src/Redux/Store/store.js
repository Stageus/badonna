import { createStore, combineReducers } from "redux"
import reducer from "../Reducer/reducer"
import joinReducer from "../Reducer/joinReducer"
import profileReducer from "../Reducer/profileReducer"
import boardReducer from "../Reducer/boardReducer"
import commentReducer from "../Reducer/commentReducer"

const rootReducer = combineReducers({
    home: reducer,
    join: joinReducer,
    profile: profileReducer,
    board: boardReducer,
    comment: commentReducer
})
const store = createStore(rootReducer)

export default store