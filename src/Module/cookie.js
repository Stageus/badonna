const setCookie = (name, value) => {
    document.cookie = `${name}=${value}`
}
const getCookie = (name) => {
    if(document.cookie === "" || document.cookie === undefined){
        return null
    }
    return document.cookie.split('; ').find(row => row.startsWith(name)).split('=')[1]
}
const delCookie = (name) => {
    setCookie(name, "")
}
export { setCookie, getCookie, delCookie }