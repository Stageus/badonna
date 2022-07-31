export const SCROLL = "SCROLL"
export const ADDRESS = "ADDRESS"

export const ADDRESS_SEARCH = "ADDRESS_SEARCH"
export const ADDRESS_DETAIL = "ADDRESS_DETAIL"
export const ADDRESS_CLOSE = "ADDRESS_CLOSE"

export const COMMENT_UPLOAD = "COMMENT_UPLOAD"
export const COMMENT_INPUT_TEXT = "COMMENT_INPUT_TEXT"
export const RE_COMMENT_INPUT = "RE_COMMENT_INPUT"
export const RE_COMMENT_UPLOAD = "RE_COMMENT_UPLOAD"
export const RE_COMMENT_INPUT_TEXT = "RE_COMMENT_INPUT_TEXT"

export const BOARD_TITLE_TEXT = "BOARD_TITLE_TEXT"
export const BOARD_ADDRESS_TEXT = "BOARD_ADDRESS_TEXT"
export const BOARD_RECRUIT_TEXT = "BOARD_RECRUIT_TEXT"
export const BOARD_CONTENT_TEXT = "BOARD_CONTENT_TEXT"
export const BOARD_UPLOAD = "BOARD_UPLOAD"

export const MORE_VIEW = "MORE_VIEW"


const changeScroll = (scroll) => {
    return {
        type: SCROLL,
        scroll: scroll
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
const commentUpload = (boardNum = null) => {
    return {
        type: COMMENT_UPLOAD,
        boardNum: boardNum
    }
}
const reCommentInput = (commentNum, reCommentNum) => {
    return {
        type: RE_COMMENT_INPUT,
        commentNum: commentNum,
        reCommentNum: reCommentNum
    }
}
const reCommentUpload = (cancel = null, commentNum) => {
    return {
        type: RE_COMMENT_UPLOAD,
        cancel: cancel,
        commentNum: commentNum
    }
}
const reCommentInputText = (text) => {
    return {
        type: RE_COMMENT_INPUT_TEXT,
        text: text
    }
}

const moreView = (num, text) => {
    return{
        type: MORE_VIEW,
        num: num,
        text: text
    }
}



export { changeScroll, address, addressSearch, addressDetail, addressClose, 
         boardTitleText, boardAddressText, boardContentText, boardRecruitText, boardUpload,
         reCommentInput, reCommentUpload, reCommentInputText, commentInputText, commentUpload,
         moreView }