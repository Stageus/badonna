import React from "react"
import App from "./App"
import ReactDom from "react-dom/client"
import store from "./Redux/Store/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import persistor from "./Redux/Store/persistStore"
import { PersistGate } from "redux-persist/integration/react"

const rootDom = document.getElementById("root")
ReactDom.createRoot(rootDom).render(
    <BrowserRouter>
        <Provider store = {store}>
            <PersistGate loadding = {null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </BrowserRouter>
)