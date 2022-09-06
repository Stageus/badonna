import { boardGet, boardPost, boardDel, boardEdit, commentGet } from "../../Module/fetch"

export const BOARD_TITLE_TEXT = "BOARD_TITLE_TEXT"
export const BOARD_ADDRESS_TEXT = "BOARD_ADDRESS_TEXT"
export const BOARD_RECRUIT_TEXT = "BOARD_RECRUIT_TEXT"
export const BOARD_CONTENT_TEXT = "BOARD_CONTENT_TEXT"
export const BOARD_DELETE = "BOARD_DELETE"
export const BOARD_EDIT = "BOARD_EDIT"
export const BOARD = "BOARD"
export const BOARD_NEW = "BOARD_NEW"

const board = () => async dispatch => {
    const data = await boardGet(0)
    return dispatch({
        type: BOARD,
        data: data,
    })
}
const boardNew = (offset) => async dispatch => {
    offset += 1
    const data = await boardGet(offset)
    return dispatch({
        type: BOARD_NEW,
        data: data,
        offset: offset
    })
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
const boardUpload = (title, address, recruit, content, boardNum = null) => async dispatch => {
    if(boardNum === null){
        await boardPost(title, content, address, recruit)
    }
    else{
        await boardEdit(boardNum, title, content, address)
    }
    const data = await boardGet()
    return dispatch({
        type: BOARD,
        data: data
    })
}
const boardDelete = (boardNum) => async dispatch => {
    await boardDel(boardNum)
    const data = await boardGet(boardNum)
    return dispatch({
        type: BOARD,
        data: data
    })
}
const boardEditPage = (boardNum) => {
    return{
        type: BOARD_EDIT,
        boardNum: boardNum
    }
}

export { boardTitleText, boardAddressText, boardContentText,
         boardRecruitText, boardUpload, board, 
         boardDelete, boardEditPage, boardNew }