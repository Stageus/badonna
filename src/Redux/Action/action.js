
export const HOME = "HOME"
export const SCROLL = "SCROLL"
export const LOGIN = "LOGIN"
export const JOIN = "JOIN"
export const BOARD = "BOARD"
export const BOARD_WRITE = "BOARD_WRITE"
export const PROFILE = "PROFILE"
export const COMMENT = "COMMENT"
export const RE_COMMENT_WRITE = "RE_COMMENT_WRITE"
export const ADDRESS = "ADDRESS"
export const ADDRESS_SEARCH = "ADDRESS_SEARCH"
export const ADDRESS_DETAIL = "ADDRESS_DETAIL"
export const ADDRESS_CLOSE = "ADDRESS_CLOSE"


const home = () => {
    return {
        type: HOME
    }
}
const changeScroll = (scroll) => {
    return {
        type: SCROLL,
        scroll: scroll
    }
}
const login = () => {
    return {
        type: LOGIN
    }
}
const join = () => {
    return {
        type: JOIN
    }
}
const board = () => {
    return {
        type: BOARD
    }
}
const boardWrite = () => {
    return {
        type: BOARD_WRITE
    }
}
const profile = () => {
    return{
        type: PROFILE
    }
}   
const comment = (index) => {
    return{
        type: COMMENT,
        index: index
    }
}
const reCommentWrite = (commentNum, reCommentNum) => {
    return {
        type: RE_COMMENT_WRITE,
        commentNum: commentNum,
        reCommentNum: reCommentNum
    }
}
const address = () => {
    return{
        type: ADDRESS
    }
}
const addressSearch = () => {
    return{
        type: ADDRESS_SEARCH
    }
}
const addressDetail = () => {
    return{
        type: ADDRESS_DETAIL
    }
}
const addressClose = () => {
    return{
        type: ADDRESS_CLOSE
    }
}
export { home, changeScroll, login, join, board, boardWrite, profile, comment, reCommentWrite, address, addressSearch, addressDetail, addressClose }