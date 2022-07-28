import React from "react"
import App from "./App"
import ReactDom from "react-dom/client"
import store from "./Redux/Store/store"
import {Provider} from "react-redux"

const rootDom = document.getElementById("root")
ReactDom.createRoot(rootDom).render(<Provider store = {store}><App/></Provider>)