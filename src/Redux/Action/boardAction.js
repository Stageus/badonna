import { boardGet } from "../../Module/fetch"

export const BOARD_TITLE_TEXT = "BOARD_TITLE_TEXT"
export const BOARD_ADDRESS_TEXT = "BOARD_ADDRESS_TEXT"
export const BOARD_RECRUIT_TEXT = "BOARD_RECRUIT_TEXT"
export const BOARD_CONTENT_TEXT = "BOARD_CONTENT_TEXT"
export const BOARD_UPLOAD = "BOARD_UPLOAD"
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
const boardUpload = () => {
    return{
        type: BOARD_UPLOAD,
    }
}

export { boardTitleText, boardAddressText, boardContentText, boardRecruitText, boardUpload, board}