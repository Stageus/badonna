
export const HOME = "HOME"
export const SCROLL = "SCROLL"
export const LOGIN = "LOGIN"
export const JOIN = "JOIN"
export const BOARD = "BOARD"
export const PROFILE = "PROFILE"
export const ADDRESS = "ADDRESS"
export const COMMENT = "COMMENT"

export const ADDRESS_SEARCH = "ADDRESS_SEARCH"
export const ADDRESS_DETAIL = "ADDRESS_DETAIL"
export const ADDRESS_CLOSE = "ADDRESS_CLOSE"

export const COMMENT_UPLOAD = "COMMENT_UPLOAD"
export const COMMENT_INPUT_TEXT = "COMMENT_INPUT_TEXT"
export const RE_COMMENT_INPUT = "RE_COMMENT_INPUT"
export const RE_COMMENT_UPLOAD = "RE_COMMENT_UPLOAD"
export const RE_COMMENT_INPUT_TEXT = "RE_COMMENT_INPUT_TEXT"

export const BOARD_WRITE = "BOARD_WRITE"
export const BOARD_TITLE_TEXT = "BOARD_TITLE_TEXT"
export const BOARD_ADDRESS_TEXT = "BOARD_ADDRESS_TEXT"
export const BOARD_RECRUIT_TEXT = "BOARD_RECRUIT_TEXT"
export const BOARD_CONTENT_TEXT = "BOARD_CONTENT_TEXT"
export const BOARD_UPLOAD = "BOARD_UPLOAD"


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
const comment = (index) => {
    return{
        type: COMMENT,
        index: index
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


const boardWrite = () => {
    return {
        type: BOARD_WRITE
    }
}
const boardTitleText = (text) => {
    return{
        type: BOARD_TITLE_TEXT,
        text: text,
    }
}
const boardAddressText = (text) => {
    return{
        type: BOARD_ADDRESS_TEXT,
        text: text,
    }
}
const boardRecruitText = (text) => {
    return{
        type: BOARD_RECRUIT_TEXT,
        text: text,
    }
}
const boardContentText = (text) => {
    return{
        type: BOARD_CONTENT_TEXT,
        text: text,
    }
}
const boardUpload = () => {
    return{
        type: BOARD_UPLOAD,
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



export { home, changeScroll, login, join, board, profile, address, comment,
         addressSearch, addressDetail, addressClose, 
         boardWrite, boardTitleText, boardAddressText, boardContentText, boardRecruitText, boardUpload,
         reCommentInput, reCommentUpload, reCommentInputText, commentInputText, commentUpload }