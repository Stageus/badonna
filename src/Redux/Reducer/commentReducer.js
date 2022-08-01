import { COMMENT_INPUT_TEXT, COMMENT_UPLOAD, RE_COMMENT_INPUT, RE_COMMENT_UPLOAD, RE_COMMENT_INPUT_TEXT } from "../Action/commentAction"

const initState = {
    comment: false,
    commentInputText: null,
    commentList: [
        [
            {
                commentNum: 0,
                user: "조민혁",
                content: "파일 날라가서 다시 코딩중"
            },
        ],
        [
            {
                commentNum: null,
                user: "",
                content: ""
            }
        ]
    ],

    reComment: null,
    reCommentInput: false,
    reCommentInputText: null,
    reCommentList: [
        [
            {
                commentNum: 0,
                reCommentNum: 0,
                user: "민민",
                content: "ㅇ"
            },
            {
                commentNum: 0,
                reCommentNum: 1,
                user: "민민",
                content: "ㅇㅇ"
            },
            {
                commentNum: 0,
                reCommentNum: 2,
                user: "민민",
                content: "ㅇㅇㅇ"
            },
        ],
    ],
}

const commentReducer = (state = initState, action) => {
    const commentList = [...state.commentList]
    const reCommentList = [...state.reCommentList]

    switch(action.type){
       //입력한 댓글
       case COMMENT_INPUT_TEXT:
        return {
            ...state,
            commentInputText: action.text
        }
        //댓글 올리기 버튼 클릭
        case COMMENT_UPLOAD:
            commentList[action.boardNum] = [...commentList[action.boardNum]]
            commentList[action.boardNum].push(
                {
                    commentNum: commentList.length - 1,
                    user: action.userName,
                    content: state.commentInputText
                }
            )
            reCommentList[0] = [...reCommentList[0]]
            reCommentList.push(
                [
                    {
                        commentNum: commentList[action.boardNum].commentNum,
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
            }
        //답글 올리기 버튼 클릭
        case RE_COMMENT_UPLOAD:
            if(action.cancel == null){
                reCommentList[action.commentNum] = [...reCommentList[action.commentNum]]
                reCommentList[action.commentNum].push(
                    {
                        commentNum: action.commentNum,
                        reCommentNum: reCommentList.length,
                        user: action.userName,
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
        default:
            return{
                ...state
            }
    }
}

export default commentReducer