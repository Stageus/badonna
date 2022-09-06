const isLogin = (token) => {
    if(token === null || token === "" || token === undefined){
        return false
    }
    return true
}

export default isLogin