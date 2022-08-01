export const COMMENT_UPLOAD = "COMMENT_UPLOAD"
export const COMMENT_INPUT_TEXT = "COMMENT_INPUT_TEXT"
export const RE_COMMENT_INPUT = "RE_COMMENT_INPUT"
export const RE_COMMENT_UPLOAD = "RE_COMMENT_UPLOAD"
export const RE_COMMENT_INPUT_TEXT = "RE_COMMENT_INPUT_TEXT"

const commentInputText= (text) => {
    return {
        type: COMMENT_INPUT_TEXT,
        text: text
    }
}
const commentUpload = (boardNum = null, userName) => {
    return {
        type: COMMENT_UPLOAD,
        boardNum: boardNum,
        userName: userName
    }
}
const reCommentInput = (commentNum, reCommentNum) => {
    return {
        type: RE_COMMENT_INPUT,
        commentNum: commentNum,
        reCommentNum: reCommentNum
    }
}
const reCommentUpload = (cancel = null, commentNum, userName) => {
    return {
        type: RE_COMMENT_UPLOAD,
        cancel: cancel,
        commentNum: commentNum,
        userName: userName
    }
}
const reCommentInputText = (text) => {
    return {
        type: RE_COMMENT_INPUT_TEXT,
        text: text
    }
}

export { reCommentInput, reCommentUpload, reCommentInputText, commentInputText, commentUpload, }