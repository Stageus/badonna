import { createStore, combineReducers, applyMiddleware } from "redux"
import reducer from "../Reducer/reducer"
import joinReducer from "../Reducer/joinReducer"
import profileReducer from "../Reducer/profileReducer"
import boardReducer from "../Reducer/boardReducer"
import commentReducer from "../Reducer/commentReducer"
import loginReducer from "../Reducer/loginReducer"
import logger from "redux-logger"
import testReducer from "../Reducer/testReducer"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    home: reducer,
    join: joinReducer,
    profile: profileReducer,
    board: boardReducer,
    comment: commentReducer,
    login: loginReducer,
    test: testReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store