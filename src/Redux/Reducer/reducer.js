import { HOME, SCROLL, LOGIN, JOIN, BOARD, BOARD_WRITE, PROFILE, COMMENT, RE_COMMENT_WRITE, ADDRESS, ADDRESS_SEARCH, ADDRESS_DETAIL, ADDRESS_CLOSE } from "../Action/action"

const initState = {
    currentCon: true,
    home: true,
    scroll: 0,
    login: false,
    join: false,
    board: false,
    boardWrite: false,
    profile: false,
    comment: false,
    address: false,
    addressSearch: false,
    addressDetail: false,
    userId: "cmh8037",
    userTel: "010-5161-8037",
    userName: "조민혁",
    userAddress: ["서울시 구로구 궁동", "목성주피터제우스"],
    termsOfService: false,
    boardTitle: ["마라탕 드실분", "캐리캐캐리"],
    boardContent: ["모집 장소는...", "에에어ㅔ어ㅔㅇ"],
    boardUser: ["조민혁", "외계인"],
    boardDate: ["2022-07-22", "2222-08-30"],
    boardLocation: ["인천시 부평구", "목성어딘가"],
    boardNum: null,
    commentUser: [["조민혁","민혁"], ["미녁", "미냑"]],
    commentContent: [["저요", "저저"], ["저주", "주저"]],
    commentNum: null,
    reCommentUser: [["조민혁", "민혁"], ["조민혁", "민혁"]],
    reCommentContent: [["승낙했어요", "감사합니다"], ["승낙 했습니다", "네"]],
    reCommentWrite: false,
    reCommentNum: null,
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
                boardNum: null,
                commentNum: null,
                reCommentNum: null,
                reCommentWrite: false,
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
                boardNum: null,
                commentNum: null,
                reCommentNum: null,
                reCommentWrite: false,
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
                comment: false,
                boardNum: null,
                commentNum: null,
                reCommentNum: null,
                reCommentWrite: false,
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
                comment: false,
                boardNum: null,
                commentNum: null,
                reCommentNum: null,
                reCommentWrite: false,
            }
        case BOARD_WRITE:
            return{
                ...state,
                home: false,
                login: false,
                join: false,
                board: false,
                boardWrite: true,
                profile: false,
                comment: false,
                boardNum: null,
                commentNum: null,
                reCommentNum: null,
                reCommentWrite: false,
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
                boardNum: null,
                commentNum: null,
                reCommentNum: null,
                reCommentWrite: false,
            }
        case COMMENT:
            return{
                ...state,
                home: false,
                login: false,
                join: false,
                board: false,
                boardWrite: false,
                profile: false,
                comment: true,
                commentNum: null,
                reCommentNum: null,
                reCommentWrite: false,
                boardNum: action.index,
            }
        case RE_COMMENT_WRITE:
            return{
                ...state,
                commentNum: action.commentNum,
                reCommentNum: action.reCommentNum,
                reCommentWrite: true
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
        default:
            return state
    }
}

export default reducer