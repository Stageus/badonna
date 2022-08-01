import { BOARD_ADDRESS_TEXT, BOARD_CONTENT_TEXT, BOARD_RECRUIT_TEXT, BOARD_TITLE_TEXT, BOARD_UPLOAD, } from "../Action/boardAction"

const initState = {
    boardInput: {
        title: "",
        content: "",
        user: "",
        date: "",
        location: "",
        recruit: "",
    },
    boardList: [
        {
            boardNum: 0,
            title: "title",
            content: "content",
            user: "user",
            date: "2022-08-28",
            location: "인천",
            recruit: "3"
        },
        {
            boardNum: 1,
            title: "title2",
            content: "content2",
            user: "user2",
            date: "2022-08-282",
            location: "인천2",
            recruit: "4"
        },
    ],
}

const boardReducer = (state = initState, action) => {
    const boardInput = {...state.boardInput}

    switch( action.type ){
        //게시글
        //입력한 제목
        case BOARD_TITLE_TEXT:
            boardInput.title = action.text
            boardInput.date = "2022-07-29"
            
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

            const boardList = [...state.boardList]
            boardList.push(
                {
                    title: state.boardInput.title,
                    date: state.boardInput.date,
                    content: state.boardInput.content,
                    user: action.userName,
                    location: state.boardInput.location,
                    recruit: state.boardInput.recruit
                }
            )
            return{
                ...state,
                board: true,
                boardWrite: false,
                boardList: boardList,
            }
        default:
            return{
                ...state
            }
    }
}

export default boardReducer