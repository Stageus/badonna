import { createStore, combineReducers, applyMiddleware } from "redux"
import reducer from "../Reducer/reducer"
import joinReducer from "../Reducer/joinReducer"
import profileReducer from "../Reducer/profileReducer"
import boardReducer from "../Reducer/boardReducer"
import commentReducer from "../Reducer/commentReducer"
import loginReducer from "../Reducer/loginReducer"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["board", "comment", "profile", "login"]
}

const rootReducer = combineReducers({
    home: reducer,
    join: joinReducer,
    profile: profileReducer,
    board: boardReducer,
    comment: commentReducer,
    login: loginReducer
})

const store = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(thunk, logger))

export default store