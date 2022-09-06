import { COMMENT_INPUT_TEXT, COMMENT_UPLOAD, COMMENT, COMMENT_INPUT,
         RECOMMENT, RE_COMMENT_INPUT, RE_COMMENT_UPLOAD, RE_COMMENT_INPUT_TEXT, } from "../Action/commentAction"

const initState = {
    boardNum: null,

    comment: false,
    commentInput: false,
    commentInputText: null,
    commentEditText: null,
    commentList: [],

    reComment: null,
    reCommentInput: false,
    reCommentInputText: null,
    reCommentList: [],
}

const commentReducer = (state = initState, action) => {

    switch(action.type){
        case 'persist/REHYDRATE':
            let boardNum, commentList, reCommentList

            if(action.payload !== undefined){
                boardNum = action.payload.comment.boardNum
                commentList = action.payload.comment.commentList
                reCommentList = action.payload.comment.reCommentList

                return{
                    ...state,
                    boardNum: boardNum,
                    commentList: commentList,
                    reCommentList: reCommentList
                }
            }
            return{
                ...state
            }
            
        case COMMENT:
            return{
                ...state,
                boardNum: action.boardNum,
                commentList: action.data,
                commentInput: false,
                reCommentInput: false,
                commentEditText: null,
                commentInputText: null,
            }
        case COMMENT_INPUT:
            if(action.commentNum === undefined){
                return {
                    ...state,
                    commentInput: false,
                    reCommentInput: false,
                    commentNum: action.commentNum,
                    reCommentInputText: null
                }
            }

            state.commentList.forEach(element => {
                if(element.comment_num === action.commentNum){
                    state.commentEditText = element.contents
                }
            })
            return {
                ...state,
                commentInput: true,
                reCommentInput: false,
                commentNum: action.commentNum,
                reCommentInputText: null
            }
       //입력한 댓글
       case COMMENT_INPUT_TEXT:
        if(action.isEdit){
            return{
                ...state,
                commentEditText: action.text
            }
        }
        return {
            ...state,
            commentInputText: action.text
        }
        //댓글 올리기 버튼 클릭
        case COMMENT_UPLOAD:
            return{
                ...state,
                commentList: action.data,
                commentInputText: null,
            }

        
        case RECOMMENT:
            console.log(action.data)
            return{
                ...state,
                reCommentList: action.data
            }
        //답글달기 입력
        case RE_COMMENT_INPUT:
            return{
                ...state,
                commentNum: action.commentNum,
                reCommentNum: action.reCommentNum,
                reCommentInput: true,
                commentInput: false,
                commentEditText: null
            }
        //답글 올리기 버튼 클릭
        case RE_COMMENT_UPLOAD:
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