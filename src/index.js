import React from "react"
import App from "./App"
import ReactDom from "react-dom/client"
import store from "./Redux/Store/store"
import {Provider} from "react-redux"
import { BrowserRouter } from "react-router-dom"

const rootDom = document.getElementById("root")
ReactDom.createRoot(rootDom).render(<BrowserRouter><Provider store = {store}><App/></Provider></BrowserRouter>)