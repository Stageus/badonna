import { createStore, combineReducers, applyMiddleware } from "redux"
import reducer from "../Reducer/reducer"
import joinReducer from "../Reducer/joinReducer"
import profileReducer from "../Reducer/profileReducer"
import boardReducer from "../Reducer/boardReducer"
import commentReducer from "../Reducer/commentReducer"
import loginReducer from "../Reducer/loginReducer"
import { createLogger } from "redux-logger"

const logger = createLogger()
const rootReducer = combineReducers({
    home: reducer,
    join: joinReducer,
    profile: profileReducer,
    board: boardReducer,
    comment: commentReducer,
    login: loginReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))

export default store