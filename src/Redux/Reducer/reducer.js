import { HOME, SCROLL, LOGIN, JOIN, BOARD, BOARD_WRITE, PROFILE } from "../Action/action"

const initState = {
    currentCon: true,
    home: true,
    scroll: 0,
    login: false,
    join: false,
    board: false,
    boardWrite: false,
    profile: false
}

const reducer = ( state = initState, action ) => {

    switch( action.type ){
        case HOME:
            return{
                ...state,
                home: true,
                scroll: 0,
                login: false,
                join: false,
                board: false,
                boardWrite: false,
                profile: false
            }
        case SCROLL:
            state.scroll += action.scroll 

            if(state.scroll > 3){
                state.scroll = 3
            }else if(state.scroll < 0){
                state.scroll = 0
            }
            return{
                ...state,
            }
        case LOGIN:
            return{
                ...state,
                home: false,
                login: true,
                join: false,
                board: false,
                boardWrite: false,
                profile: false
            }
        case JOIN:
            return{
                ...state,
                home: false,
                login: false,
                join: true,
                board: false,
                boardWrite: false,
                profile: false
            }
        case BOARD:
            return{
                ...state,
                home: false,
                login: false,
                join: false,
                board: true,
                boardWrite: false,
                profile: false
            }
        case BOARD_WRITE:
            return{
                ...state,
                home: false,
                login: false,
                join: false,
                board: false,
                boardWrite: true,
                profile: false
            }
        case PROFILE:
            return{
                ...state,
                home: false,
                login: false,
                join: false,
                board: false,
                boardWrite: false,
                profile: true
            }
        default:
            return state
    }
}

export default reducer