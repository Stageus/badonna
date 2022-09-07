import { commentDel, commentGet, commentPost, commentPut, reCommentGet, reCommentPost } from "../../Module/fetch"

export const COMMENT = "COMMENT"
export const COMMENT_INPUT = "COMMENT_INPUT"
export const COMMENT_UPLOAD = "COMMENT_UPLOAD"
export const COMMENT_INPUT_TEXT = "COMMENT_INPUT_TEXT"
export const RECOMMENT = "RECOMMENT"
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
    await commentDel(commentNum)
    const data = await commentGet(boardNum)
    dispatch({
        type: COMMENT,
        data: data,
        boardNum: boardNum
    })
}
const commentEdit = (boardNum, commentNum, contents) => async dispatch => {
    await commentPut(commentNum, contents)
    const data = await commentGet(boardNum)
    dispatch({
        type: COMMENT,
        data: data,
        boardNum: boardNum
    })
}
const commentUpload = (boardNum = null, contents) => async dispatch => {
    await commentPost(boardNum, contents)
    const data = await commentGet(boardNum)
    dispatch({
        type: COMMENT_UPLOAD,
        data: data
    })
}
const commentEditText = (text) => {
    return {
        type: COMMENT_INPUT_TEXT,
        text: text,
        isEdit: true
    }
}
const commentInputText = (text) => {
    return {
        type: COMMENT_INPUT_TEXT,
        text: text,
        isEdit: false
    }
}
const commentInput = (commentNum) => {
    return {
        type: COMMENT_INPUT,
        commentNum: commentNum
    }
}



const reComment = (commentNumList) => async dispatch => {
    let data = []

    if(commentNumList !== null){
        for(const element of commentNumList){
            const d = await reCommentGet(element.comment_num)
            data.push(d)
        }
    }
    dispatch({
        type: RECOMMENT,
        data: data
    })
}
const reCommentInput = (commentNum = undefined, reCommentNum = undefined) => {
    return {
        type: RE_COMMENT_INPUT,
        commentNum: commentNum,
        reCommentNum: reCommentNum
    }
}
const reCommentUpload = (commentNum, content) => async dispatch => {
    await reCommentPost(commentNum, content)
    const data = await reCommentGet(commentNum)
    
    dispatch({
        type: RE_COMMENT_UPLOAD,
        data: data
    })
}
const reCommentInputText = (text) => {
    return {
        type: RE_COMMENT_INPUT_TEXT,
        text: text,
        isEdit: false
    }
}
const reCommentEditText = (text) => {
    return {
        type: RE_COMMENT_INPUT_TEXT,
        text: text,
        isEdit: true
    }
}

export { comment, commentInput, commentInputText, commentEditText, commentUpload, commentDelete, commentEdit,
         reCommentInput, reCommentUpload, reCommentInputText, reComment, reCommentEditText }