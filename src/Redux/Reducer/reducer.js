import { HOME, SCROLL, LOGIN, JOIN, BOARD, PROFILE, ADDRESS, ADDRESS_SEARCH, ADDRESS_DETAIL, ADDRESS_CLOSE, COMMENT, COMMENT_INPUT_TEXT, COMMENT_UPLOAD, RE_COMMENT_INPUT, RE_COMMENT_UPLOAD, RE_COMMENT_INPUT_TEXT, BOARD_WRITE, BOARD_TITLE_TEXT, BOARD_RECRUIT_TEXT, BOARD_ADDRESS_TEXT, BOARD_CONTENT_TEXT, BOARD_UPLOAD, MORE_VIEW } from "../Action/action"

const initState = {
    currentCon: true,
    home: true,
    scroll: 0,
    login: false,
    termsOfService: false,
    join: false,
    board: false,
    boardWrite: false,


    boardNum: null,
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
            title: "title",
            content: "content",
            user: "user",
            date: "2022-08-28",
            location: "인천",
            recruit: "3"
        },
        {
            title: "title2",
            content: "content2",
            user: "user2",
            date: "2022-08-282",
            location: "인천2",
            recruit: "4"
        },
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
                user: "",
                content: ""
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
    ],


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


    moreView: false,
    moreViewName: "",
}

const reducer = ( state = initState, action ) => {

    const boardInput = {...state.boardInput}
    const commentList = [...state.commentList]
    const reCommentList = [...state.reCommentList]
    
    switch( action.type ){
        //홈페이지
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
                commentInputText: null,
                boardNum: null,
                commentNum: null,
                moreView: false,
                moreViewName: "",
            }


        //메인페이지 스크롤
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

        
        //로그인 페이지
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
                commentInputText: null,
                boardNum: null,
                commentNum: null,
                moreView: false,
                moreViewName: "",
            }

        
        //회원가입 페이지
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
                commentInputText: null,
                boardNum: null,
                commentNum: null,
                moreView: false,
                moreViewName: "",
            }


        //회원 정보 페이지
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
                commentInputText: null,
                boardNum: null,
                commentNum: null,
                moreView: false,
                moreViewName: "",
            }


        //게시글
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
                commentInputText: null,
                boardNum: null,
                commentNum: null,
                moreView: false,
                moreViewName: "",
            }
        //게시글 쓰기 페이지
        case BOARD_WRITE:
            return{
                ...state,
                board: false,
                boardWrite: true
            }
        //입력한 제목
        case BOARD_TITLE_TEXT:
            boardInput.title = action.text
            boardInput.date = "2022-07-29"
            boardInput.location = state.user.address[0]
            
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
                    user: state.user.name,
                    location: state.user.address[0],
                    recruit: state.boardInput.recruit
                }
            )
            commentList.push(
                [
                    {
                        user: "",
                        content: ""
                    }
                ]  
            )
            return{
                ...state,
                board: true,
                boardWrite: false,
                boardList: boardList,
                commentList: commentList
            }


        //주소 즐겨찾기
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
        //2번째 주소 즐찾창
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
        //3번째 주소즐찾창
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
        //주소 즐찾닫기
        case ADDRESS_CLOSE:
            return{
                ...state,
                address: false,
                addressSearch: false,
                addressDetail: false,
            }


        //댓글, 답글 페이지 전환
        case COMMENT:
            return {
                ...state,
                comment: true,
                board: false,
                boardNum: action.index,
                commentNum: null,
                moreView: false,
                moreViewName: "",
            }
        //입력한 댓글
        case COMMENT_INPUT_TEXT:
            return {
                ...state,
                commentInputText: action.text
            }
        //댓글 올리기 버튼 클릭
        case COMMENT_UPLOAD:
            commentList[state.boardNum] = [...commentList[state.boardNum]]
            commentList[state.boardNum].push(
                {
                    user: state.user.name,
                    content: state.commentInputText
                }
            )
            reCommentList[0] = [...reCommentList[0]]
            reCommentList.push(
                [
                    {
                        user:"",
                        content: "",
                    }
                ]
            )
            return{
                ...state,
                commentList: commentList,
                reCommentList: reCommentList
            }
        //답글달기 입력
        case RE_COMMENT_INPUT:
            return{
                ...state,
                commentNum: action.commentNum,
                reCommentNum: action.reCommentNum,
                reCommentInput: true,
                moreView: false,
                moreViewName: ""
            }
        //답글 올리기 버튼 클릭
        case RE_COMMENT_UPLOAD:
            if(action.cancel == null){
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
        //입력한 답글
        case RE_COMMENT_INPUT_TEXT:
            return {
                ...state,
                reCommentInputText: action.text,
            }


        //더보기 버튼
        case MORE_VIEW:
            console.log(action.text)
            console.log(action.num)
            if(action.text === "board"){
                if(state.moreView){
                    if(action.num !== state.boardNum){
                        return{
                            ...state,
                            boardNum: action.num
                        }
                    }
                    return{
                        ...state,
                        moreView: false,
                        boardNum: null
                    }
                }
                return {
                    ...state,
                    moreView: true,
                    boardNum: action.num
                }
            }else if(action.text === "comment"){
                if(state.moreView){
                    if(action.num !== state.commentNum){
                        return{
                            ...state,
                            commentNum: action.num,
                            reCommentNum: null,
                            reCommentInput: false,
                        }
                    }
                    return{
                        ...state,
                        moreView: false,
                        commentNum: null,
                        reCommentNum: null,
                        reCommentInput: false,
                    }
                }
                return {
                    ...state,
                    moreView: true,
                    commentNum: action.num,
                    reCommentNum: null,
                    reCommentInput: false,
                }
            }
            if(state.moreView){
                if(action.num !== state.reCommentNum){
                    return{
                        ...state,
                        reCommentNum: action.num,
                        commentNum: null,
                        reCommentInput: false,
                    }
                }
                return{
                    ...state,
                    moreView: false,
                    reCommentNum: null,
                    commentNum: null,
                    reCommentInput: false,
                }
            }
            return {
                ...state,
                moreView: true,
                reCommentNum: action.num,
                commentNum: null,
                reCommentInput: false,
            }
            
            
        default:
            return state
    }
}

export default reducer