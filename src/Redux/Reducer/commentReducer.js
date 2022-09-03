import { COMMENT_INPUT_TEXT, COMMENT_UPLOAD, RE_COMMENT_INPUT, RE_COMMENT_UPLOAD, RE_COMMENT_INPUT_TEXT, COMMENT } from "../Action/commentAction"

const initState = {
    boardNum: null,

    comment: false,
    commentInputText: null,
    commentList: [],

    reComment: null,
    reCommentInput: false,
    reCommentInputText: null,
    reCommentList: [],
}

const commentReducer = (state = initState, action) => {
    const reCommentList = [...state.reCommentList]

    switch(action.type){
        case 'persist/REHYDRATE':
            return{
                ...state,
                boardNum: action.payload.comment.boardNum,
                commentList: action.payload.comment.commentList
            }
        case COMMENT:
            return{
                ...state,
                boardNum: action.boardNum,
                commentList: action.data
            }
       //입력한 댓글
       case COMMENT_INPUT_TEXT:
        return {
            ...state,
            commentInputText: action.text
        }
        //댓글 올리기 버튼 클릭
        case COMMENT_UPLOAD:
            return{
                ...state,
                commentList: action.data
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