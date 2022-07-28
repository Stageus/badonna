import { HOME, SCROLL, LOGIN, JOIN, BOARD, PROFILE, ADDRESS, ADDRESS_SEARCH, ADDRESS_DETAIL, ADDRESS_CLOSE, COMMENT, COMMENT_INPUT_TEXT, COMMENT_UPLOAD, RE_COMMENT_INPUT, RE_COMMENT_UPLOAD, RE_COMMENT_INPUT_TEXT, BOARD_WRITE } from "../Action/action"

const initState = {
    currentCon: true,
    home: true,
    scroll: 0,
    login: false,
    join: false,
    board: false,
    boardNum: null,
    boardInput: {
        title: null,
        constent: null,
        user: null,
        date: null,
        location: null,
    },
    boardList: [
        {
            title: "title",
            content: "content",
            user: "user",
            date: "2022-08-28",
            location: "인천"
        },
        {
            title: "title2",
            content: "content2",
            user: "user2",
            date: "2022-08-282",
            location: "인천2"
        }
    ],
    comment: false,
    commentNum: null,
    commentInputText: null,
    commentList: [
        [
            {
                user: "조민혁",
                content: "파일 날라가서 다시 코딩중"
            },
        ],
        [
            {
                user: null,
                content: null
            }
        ]
    ],
    reComment: null,
    reCommentNum: null,
    reCommentInput: false,
    reCommentInputText: null,
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
                user: null,
                content: null
            }
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
                reCommentInputText: null,
                commentInputText: null
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
                reCommentInputText: null,
                commentInputText: null
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
                reCommentInputText: null,
                commentInputText: null
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
                reCommentInputText: null,
                commentInputText: null
            }
        case BOARD_WRITE:
            return{
                ...state,
                board: false,
                boardWrite: true
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
                reCommentInputText: null,
                commentInputText: null
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
                commentInputText: action.text
            }
        case COMMENT_UPLOAD:
            const commentList = [...state.commentList]
            commentList[state.boardNum] = [...commentList[state.boardNum]]
            commentList[state.boardNum].push(
                {
                    user: state.user.name,
                    content: state.commentInputText
                }
            )
            return{
                ...state,
                commentList: commentList
            }
        case RE_COMMENT_INPUT:
            return{
                ...state,
                commentNum: action.commentNum,
                reCommentNum: action.reCommentNum,
                reCommentInput: true
            }
        case RE_COMMENT_UPLOAD:
            if(action.cancel == null){
                const reCommentList = [...state.reCommentList]
                reCommentList[state.commentNum] = [...reCommentList[state.commentNum]]
                reCommentList[state.commentNum].push(
                    {
                        user: state.user.name,
                        content: state.reCommentInputText
                    }
                )
                return {
                    ...state,
                    reCommentList: reCommentList,
                    reCommentInput: false,
                    reCommentInputText: null,
                }
            }
            return {
                ...state,
                reCommentInput: false,
                reCommentInputText: null,
            }
        case RE_COMMENT_INPUT_TEXT:
            return {
                ...state,
                reCommentInputText: action.text,
            }
        default:
            return state
    }
}

export default reducer