
export const HOME = "HOME"
export const SCROLL = "SCROLL"
export const LOGIN = "LOGIN"
export const JOIN = "JOIN"
export const BOARD = "BOARD"
export const BOARD_WRITE = "BOARD_WRITE"
export const PROFILE = "PROFILE"


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
export { home, changeScroll, login, join, board, boardWrite, profile }