
export const HOME = "HOME"
export const SCROLL = "SCROLL"
export const LOGIN = "LOGIN"
export const JOIN = "JOIN"
export const BOARD = "BOARD"
export const PROFILE = "PROFILE"
export const ADDRESS = "ADDRESS"
export const ADDRESS_SEARCH = "ADDRESS_SEARCH"
export const ADDRESS_DETAIL = "ADDRESS_DETAIL"
export const ADDRESS_CLOSE = "ADDRESS_CLOSE"
export const COMMENT = "COMMENT"
export const COMMENT_UPLOAD = "COMMENT_UPLOAD"
export const COMMENT_INPUT_TEXT = "COMMENT_INPUT_TEXT"
export const RE_COMMENT_INPUT = "RE_COMMENT_INPUT"
export const RE_COMMENT_UPLOAD = "RE_COMMENT_UPLOAD"
export const RE_COMMENT_INPUT_TEXT = "RE_COMMENT_INPUT_TEXT"
export const BOARD_WRITE = "BOARD_WRITE"


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
const profile = () => {
    return{
        type: PROFILE
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
const comment = (index) => {
    return{
        type: COMMENT,
        index: index
    }
}
const boardWrite = () => {
    return {
        type: BOARD_WRITE
    }
}
const commentInputText= (text) => {
    return {
        type: COMMENT_INPUT_TEXT,
        text: text
    }
}
const commentUpload = () => {
    return {
        type: COMMENT_UPLOAD,
    }
}
const reCommentInput = (commentNum, reCommentNum) => {
    return {
        type: RE_COMMENT_INPUT,
        commentNum: commentNum,
        reCommentNum: reCommentNum
    }
}
const reCommentUpload = (cancel = null) => {
    return {
        type: RE_COMMENT_UPLOAD,
        cancel: cancel
    }
}
const reCommentInputText = (text) => {
    return {
        type: RE_COMMENT_INPUT_TEXT,
        text: text
    }
}
export { home, changeScroll, login, join, board, profile, address, addressSearch, addressDetail, addressClose, boardWrite, comment, reCommentInput, reCommentUpload, reCommentInputText, commentInputText, commentUpload }