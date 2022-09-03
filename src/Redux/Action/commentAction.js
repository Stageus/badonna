import { commentDel, commentGet, commentPost } from "../../Module/fetch"

export const COMMENT = "COMMENT"
export const COMMENT_UPLOAD = "COMMENT_UPLOAD"
export const COMMENT_INPUT_TEXT = "COMMENT_INPUT_TEXT"
export const RE_COMMENT_INPUT = "RE_COMMENT_INPUT"
export const RE_COMMENT_UPLOAD = "RE_COMMENT_UPLOAD"
export const RE_COMMENT_INPUT_TEXT = "RE_COMMENT_INPUT_TEXT"

const comment = (boardNum) => async dispatch => {
    const data = await commentGet(boardNum)
    dispatch({
        type: COMMENT,
        data: data,
        boardNum: boardNum
    })
}
const commentDelete = (boardNum, commentNum) => async dispatch => {
    console.log(boardNum)
    console.log(commentNum)
    await commentDel(commentNum)
    const data = await commentGet(boardNum)
    dispatch({
        type: COMMENT,
        data: data,
        boardNum: boardNum
    })
}
const commentInputText= (text) => {
    return {
        type: COMMENT_INPUT_TEXT,
        text: text
    }
}
const commentUpload = (boardNum = null, contents) => async dispatch => {
    await commentPost(boardNum, contents)
    const data = await commentGet(boardNum)
    dispatch({
        type: COMMENT_UPLOAD,
        data: data
    })
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

export { comment, reCommentInput, reCommentUpload, reCommentInputText, commentInputText, commentUpload, commentDelete }