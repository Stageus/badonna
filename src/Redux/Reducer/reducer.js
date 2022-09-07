import { TERMS_OF_SERVICE, SCROLL, ADDRESS, ADDRESS_SEARCH, ADDRESS_DELETE, DIALOG_CLOSE,  
         MORE_VIEW, ID_CHECK, TEL_CHECK, ADDRESS_DELETE_NUM } from "../Action/action"
import swal from "sweetalert2"

const initState = {
    topbar: false,
    scroll: 0,

    address: false,
    addressClick: false,
    addressSearch: false,
    addressDetail: false,
    addressCheckBox: false,
    addressList: [],
    addressDel: null,
    addressCheckStatus: false,
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
            return{
                ...state,
                address: true,
                addressSearch: false,
                addressList: action.data,
                addressClick: action.click
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
        case ADDRESS_DELETE_NUM:
            // const addressDelList = [...state.addressDelList]
            // if(action.checked){
            //     addressDelList.push(action.addressNum)
            //     return{
            //         ...state,
            //         addressDelList: addressDelList
            //     }
            // }
            // if(addressDelList.length > 0){
            //     addressDelList.splice(addressDelList.indexOf(action.addressNum), 1)
            //     return{
            //         ...state,
            //         addressDelList: addressDelList
            //     }
            // }
            if(action.checked){
                return{
                    ...state,
                    addressDel: action.data,
                    addressCheckStatus: action.checked
                }
            }
            return{
                ...state,
                addressDel: null,
                addressCheckStatus: false
            }
        case ADDRESS_DELETE:
            if(action.data === null || action.data === undefined){
                return{
                    ...state,
                    addressCheckBox: !state.addressCheckBox,
                    addressDel: null
                }
            }
            return{
                ...state,
                addressCheckBox: !state.addressCheckBox,
                addressDel: null,
                addressList: action.data 
            }
        //주소 즐찾닫기
        case DIALOG_CLOSE:
            let data = state.addressList
            if(action.sort === "address"){
                swal.fire({
                    width: "500px",
                    title: "성공",
                    icon: "success",
                    confirmButtonText: "확인",
                    confirmButtonColor: "#ff7396",
                    html: "주소 즐겨찾기 등록 완료.<style>.swal2-html-container{margin: 0; height: fit-content;}</style>"
                })
                data = action.data
            }
            return{
                ...state,
                address: false,
                addressSearch: false,
                addressDetail: false,
                idCheck: false,
                telCheck: false,
                addressCheckBox: false,
                addressDelList: [],
                addressList: data
            } 


        //더보기 버튼
        case MORE_VIEW:
            return {
                ...state,
                moreView: {
                    isOpen: !state.moreView.isOpen,
                    name: action.text,
                    num: action.num
                }
            }
            
            
        default:
            return state
    }
}

export default reducer