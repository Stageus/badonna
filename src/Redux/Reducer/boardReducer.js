import { boardPost } from "../../Module/fetch"
import { BOARD_ADDRESS_TEXT, BOARD_CONTENT_TEXT, BOARD_RECRUIT_TEXT, BOARD_TITLE_TEXT, BOARD_UPLOAD, BOARD } from "../Action/boardAction"

const initState = {
    boardInput: {
        title: "",
        location: "",
        recruit: "",
        content: "",
    },
    boardList: [],
}

const boardReducer = (state = initState, action) => {
    const boardInput = {...state.boardInput}

    switch( action.type ){
        //게시글
        //입력한 제목
        case BOARD:
            return{
                ...state,
                boardList: action.data
            }
        case BOARD_TITLE_TEXT:
            boardInput.title = action.text
            
            return{
                ...state,
                boardInput: boardInput,
            }
        //입력한 주소
        case BOARD_ADDRESS_TEXT:
            boardInput.location = action.text
            
            return{
                ...state,
                boardInput: boardInput,
            }
        //입력한 모집인원
        case BOARD_RECRUIT_TEXT:
            boardInput.recruit = action.text
            
            return{
                ...state,
                boardInput: boardInput,
            }
        //입력한 내용
        case BOARD_CONTENT_TEXT:
            boardInput.content = action.text
            
            return{
                ...state,
                boardInput: boardInput,
            }
        //게시글 등록 버튼
        case BOARD_UPLOAD:
            boardPost(
                state.boardInput.title,
                state.boardInput.content,
                state.boardInput.location,
                state.boardInput.recruit
            )
            return{
                ...state,
            }
        default:
            return{
                ...state
            }
    }
}

export default boardReducer