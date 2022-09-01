import { TERMS_OF_SERVICE, SCROLL, ADDRESS, ADDRESS_SEARCH, ADDRESS_DETAIL, DIALOG_CLOSE,  
         MORE_VIEW, ID_CHECK, TEL_CHECK } from "../Action/action"
import swal from "sweetalert2"
import { addressPut } from "../../Module/fetch"

const initState = {
    scroll: 0,

    address: false,
    addressSearch: false,
    addressDetail: false,
    addressList: [],
    idCheck: false,
    telCheck: false,


    moreView: {
        isOpen: false,
        name: "",
        num: 0
    }
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
                addressList: action.addressList
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
        //주소 즐찾닫기
        case DIALOG_CLOSE:
            if(action.sort === "address"){
                console.log(addressPut(action.text))
                swal.fire({
                    width: "500px",
                    title: "성공",
                    icon: "success",
                    confirmButtonText: "확인",
                    confirmButtonColor: "#ff7396",
                    html: "주소 즐겨찾기 등록 완료.<style>.swal2-html-container{margin: 0; height: fit-content;}</style>"
                })
            }
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
            return {
                ...state,
                moreView: {
                    isOpen: !(state.moreView.isOpen),
                    name: action.text,
                    num: action.num
                }
            }
            
            
        default:
            return state
    }
}

export default reducer