import { boardPost } from "../../Module/fetch"
import { BOARD_ADDRESS_TEXT, BOARD_CONTENT_TEXT, BOARD_RECRUIT_TEXT, BOARD_TITLE_TEXT, BOARD_EDIT, BOARD } from "../Action/boardAction"

const initState = {
    boardInput: {
        boardNum: null,
        title: "",
        location: "",
        recruit: "",
        content: "",
    },
    boardList: [],
    comment: null
}

const boardReducer = (state = initState, action) => {
    const boardInput = {...state.boardInput}
    
    switch( action.type ){
        case "persist/REHYDRATE":
            return{
                ...state,
                boardList: action.payload.board.boardList
            }
        case BOARD:
            return{
                ...state,
                boardList: action.data,
                boardInput: {
                    boardNum: null,
                    title: "",
                    location: "",
                    recruit: "",
                    content: "",
                }
            }
        case BOARD_TITLE_TEXT:
            boardInput.title = action.text  
            return{
                ...state,
                boardInput: boardInput,
            }
        case BOARD_ADDRESS_TEXT:
            boardInput.location = action.text            
            return{
                ...state,
                boardInput: boardInput,
            }
        case BOARD_RECRUIT_TEXT:
            boardInput.recruit = action.text           
            return{
                ...state,
                boardInput: boardInput,
            }
        case BOARD_CONTENT_TEXT:
            boardInput.content = action.text
            return{
                ...state,
                boardInput: boardInput,
            }
        case BOARD_EDIT:
            state.boardList.forEach(element => {
                if(element.board_num === action.boardNum){
                    boardInput.boardNum = action.boardNum
                    boardInput.title = element.title
                    boardInput.location = element.place
                    boardInput.recruit = element.join_count
                    boardInput.content = element.contents
                }
            })
            return{
                ...state,
                boardInput: boardInput,
            }
        default:
            return{
                ...state
            }
    }
}

export default boardReducer