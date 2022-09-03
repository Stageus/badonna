import { boardGet, boardPost, boardDel, boardEdit } from "../../Module/fetch"

export const BOARD_TITLE_TEXT = "BOARD_TITLE_TEXT"
export const BOARD_ADDRESS_TEXT = "BOARD_ADDRESS_TEXT"
export const BOARD_RECRUIT_TEXT = "BOARD_RECRUIT_TEXT"
export const BOARD_CONTENT_TEXT = "BOARD_CONTENT_TEXT"
export const BOARD_DELETE = "BOARD_DELETE"
export const BOARD_EDIT = "BOARD_EDIT"
export const BOARD = "BOARD"

const board = () => async dispatch => {
    const data = await boardGet()
    return dispatch({
        type: BOARD,
        data: data
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
    console.log(boardNum)
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

export { boardTitleText, boardAddressText, boardContentText, boardRecruitText, boardUpload, board, boardDelete, boardEditPage }