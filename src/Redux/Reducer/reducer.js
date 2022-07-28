import { HOME, SCROLL, LOGIN, JOIN, BOARD, PROFILE, ADDRESS, ADDRESS_SEARCH, ADDRESS_DETAIL, ADDRESS_CLOSE, COMMENT, COMMENT_INPUT_TEXT, RE_COMMENT_INPUT, RE_COMMENT_INPUT_UPLOAD, RE_COMMENT_INPUT_TEXT, BOARD_WRITE } from "../Action/action"

const initState = {
    currentCon: true,
    home: true,
    scroll: 0,
    login: false,
    join: false,
    board: false,
    boardNum: null,
    boardList: [
        {
            title: "title",
            content: "content",
            user: "user",
            date: "2022-08-28",
            location: "인천"
        }
    ],
    comment: false,
    commentNum: null,
    commentList: [
        [
            {
                user: "조민혁",
                content: "파일 날라가서 다시 코딩중"
            }
        ],
    ],
    reComment: null,
    reCommentNum: null,
    reCommentInput: false,
    reCommentList: [
        [
            {
            user: "민민",
            content: "ㅇ"
            },
            {
                user: "민민",
                content: "ㅇㅇ"
            },
            {
                user: "민민",
                content: "ㅇㅇㅇ"
            },
        ],
        [
            {
                user: "조조",
                content: "ㅁ"
                },
                {
                    user: "조",
                    content: "ㅁㅁ"
                },
                {
                    user: "조주",
                    content: "ㅁㅁㅁ"
                },
        ]
    ],
    boardWrite: false,
    profile: false,
    user: {
        id: "cmh8037",
        tel: "010-5161-8037",
        name: "조민혁",
        address: ["서울시 구로구 궁동", "목성주피터제우스"],
    },
    address: false,
    addressSearch: false,
    addressDetail: false,
    termsOfService: false,
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
                profile: false,
                comment: false,
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
                profile: false,
                comment: false,
            }
        case JOIN:
            return{
                ...state,
                home: false,
                login: false,
                join: true,
                board: false,
                boardWrite: false,
                profile: false,
            }
        case BOARD:
            return{
                ...state,
                home: false,
                login: false,
                join: false,
                board: true,
                boardWrite: false,
                profile: false,
            }
        case PROFILE:
            return{
                ...state,
                home: false,
                login: false,
                join: false,
                board: false,
                boardWrite: false,
                profile: true,
                comment: false,
            }
        case ADDRESS:
            if(state.address){
                state.address = false
                state.addressSearch = false
                state.addressDetail = false
            }else{
                state.address = true
                state.addressSearch = false
                state.addressDetail = false
            }
            return{
                ...state,
            }
        case ADDRESS_SEARCH:
            if(state.addressSearch){
                state.address = true
                state.addressSearch = false
            }else{
                state.address = false
                state.addressSearch = true
                state.addressDetail = false
            }
            return{
                ...state,
            }
        case ADDRESS_DETAIL:
            if(state.addressDetail){
                state.addressSearch = true
                state.addressDetail = false
            }else{
                state.addressSearch = false
                state.addressDetail = true
            }
            return{
                ...state,
            }
        case ADDRESS_CLOSE:
            return{
                ...state,
                address: false,
                addressSearch: false,
                addressDetail: false,
            }
        case COMMENT:
            return {
                ...state,
                comment: true,
                board: false,
                boardNum: action.index
            }
        case COMMENT_INPUT_TEXT:
            return {
                ...state,
            }
        case RE_COMMENT_INPUT:
            return{
                ...state,
                commentNum: action.commentNum,
                reCommentNum: action.reCommentNum,
                reCommentInput: true
            }
        case RE_COMMENT_INPUT_UPLOAD:
            if(action.cancel == null){
                console.log("hi")
            }
            return {
                ...state,
                reCommentInput: false
            }
        default:
            return state
    }
}

export default reducer