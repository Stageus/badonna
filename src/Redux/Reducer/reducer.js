import { TERMS_OF_SERVICE, SCROLL, ADDRESS, ADDRESS_SEARCH, ADDRESS_DETAIL, DIALOG_CLOSE,  
         MORE_VIEW, ID_CHECK, TEL_CHECK } from "../Action/action"

const initState = {
    currentCon: true,
    scroll: 0,

    address: false,
    addressSearch: false,
    addressDetail: false,
    idCheck: false,
    telCheck: false,


    moreView: false,
    moreViewName: "",
}

const reducer = ( state = initState, action ) => {
    
    switch( action.type ){

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
        case TERMS_OF_SERVICE:
            if(action.cancel){
                return{
                    ...state,
                    termsOfService: false
                }
            }
            return{
                ...state,
                termsOfService: true,
            }

        case ID_CHECK:
            return{
                ...state,
                idCheck: true,
            }
        case TEL_CHECK:
            return{
                ...state,
                telCheck: true,
            }
        //주소 즐겨찾기
        case ADDRESS:
            if(state.address){
                state.address = false
                state.addressSearch = false
                state.addressDetail = false
                state.idCheck = false
                state.telCheck = false
            }else{
                state.address = true
                state.addressSearch = false
                state.addressDetail = false
                state.idCheck = false
                state.telCheck = false
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
        case DIALOG_CLOSE:
            return{
                ...state,
                address: false,
                addressSearch: false,
                addressDetail: false,
                idCheck: false,
                telCheck: false,
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
                        }
                    }
                    return{
                        ...state,
                        moreView: false,
                    }
                }
                return {
                    ...state,
                    moreView: true,
                }
            }else if(action.text === "comment"){
                if(state.moreView){
                    if(action.num !== state.commentNum){
                        return{
                            ...state,
                        }
                    }
                    return{
                        ...state,
                        moreView: false,
                    }
                }
                return {
                    ...state,
                    moreView: true,
                }
            }
            if(state.moreView){
                if(action.num !== state.reCommentNum){
                    return{
                        ...state,
                    }
                }
                return{
                    ...state,
                    moreView: false,
                }
            }
            return {
                ...state,
                moreView: true,
            }
            
            
        default:
            return state
    }
}

export default reducer