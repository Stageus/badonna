const setCookie = (name, value, time = 3600) => {
    document.cookie = `${name}=${value}; path=/; max-age=${time}`
}
const getCookie = (name) => {
    if(document.cookie === "" || document.cookie === undefined){
        return null
    }
    return document.cookie.split('; ').find(row => row.startsWith(name)).split('=')[1]
}
const delCookie = (name) => {
    setCookie(name, "", 0)
}
export { setCookie, getCookie, delCookie }