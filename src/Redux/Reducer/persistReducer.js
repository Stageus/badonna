import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { rootReducer } from "../Store/store"
import boardReducer from "./boardReducer"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["board", "comment"]
}

export default persistReducer(persistConfig, boardReducer)