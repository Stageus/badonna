import { setCookie, getCookie } from "./cookie"

const basic = "http://3.35.16.191:3000"

async function loginPost(id, pw){
    const bool = await fetch(`${basic}/account/login`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "id": id,
            "pw": pw,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.message)
            setCookie("access-token", result.token)
            setCookie("id", id)
            return true
        }
        console.log(result.message)
        return false
    })
    return bool
}

async function profileGet(){

    const data = await fetch(`${basic}/account?id=${getCookie("id")}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.message)
            console.log(result.data)
            return result.data
        }
        console.log(result.message)
    })
    return data
}

async function duplicateIdPost(id){

    if(id === ""){
        return false
    }
    const bool = await fetch(`${basic}/account/duplicate/id`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json" // 내가 요청에 담아서 보내는 데이터들의 형태 & 자료형을 설정
        },
        "body": JSON.stringify({ // api에서 요구하는 값을 넣어줌
            "id": id,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.message)
            return false
        }
        console.log(result.message)
        return true
    })

    return bool
}

const joinPost = (id, pw, name, phonenum) => {
    
    fetch(`${basic}/account`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json" // 내가 요청에 담아서 보내는 데이터들의 형태 & 자료형을 설정
        },
        "body": JSON.stringify({ // api에서 요구하는 값을 넣어줌
            "id": id,
            "pw": pw,
            "name": name,
            "phonenum": phonenum,
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result.message)
    })
}

async function addressGet(){
    const data = await fetch(`${basic}/place?id=${getCookie("id")}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.message)
            console.log(result.data)
            return result.data
        }
        console.log(result.message)
    })
    return data
}
async function addressPut(address) {
    await fetch(`${basic}/place`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        },
        "body": JSON.stringify({
            "id": getCookie("id"),
            "place": address,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.message)
            return true
        }
        console.log(result.message)
        return false
    })
}

async function boardGet(offset){
    const data = await fetch(`${basic}/board?offset=${offset}&id=${getCookie("id")}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.message)
            return result.data
        }
        console.log(result.message)
    })
    return data
}

async function boardPost(title, contents, address, joinCount){
    await fetch(`${basic}/board`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        },
        "body": JSON.stringify({
            "title": title,
            "contents": contents,
            "place": address,
            "id": getCookie("id"),
            "is_end": 0,
            "join_count": joinCount,
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log(result.message)
            return
        }
        console.log(result.message)
    })
}

async function boardDel(boardNum){
    await fetch(`${basic}/board`, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        },
        "body": JSON.stringify({
            "board_num": boardNum
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log(result.message)
            return
        }
        console.log(result.message)
    })
}

async function boardEdit(boardNum, title, contents, address){
    await fetch(`${basic}/board`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        },
        "body": JSON.stringify({
            "board_num": boardNum,
            "id": getCookie("id"),
            "title": title,
            "contents": contents,
            "place": address 
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log(result.message)
            return
        }
        console.log(result.message)
    })
}

async function commentPost(boardNum, contents){
    await fetch(`${basic}/comment`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        },
        "body": JSON.stringify({
            "board_num": boardNum,
            "contents": contents,
            "id": getCookie("id"),
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log(result.message)
            return
        }
        console.log(result.message)
    })
}

async function commentGet(boardNum){
    const data = await fetch(`${basic}/comment?board_num=${boardNum}&id=${getCookie("id")}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.message)
            return result.data
        }
        console.log(result.message)
    })
    return data
}

async function commentDel(commentNum){
    await fetch(`${basic}/comment`, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        },
        "body": JSON.stringify({
            "comment_num": commentNum
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log(result.message)
            return
        }
        console.log(result.message)
    })
}

async function commentPut(commentNum, contents){
    await fetch(`${basic}/comment`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        },
        "body": JSON.stringify({
            "comment_num": commentNum,
            "contents": contents
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log(result.message)
            return
        }
        console.log(result.message)
    })
}

async function reCommentPost(commentNum, contents){
    await fetch(`${basic}/reply`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        },
        "body": JSON.stringify({
            "comment_num": commentNum,
            "contents": contents,
            "id": getCookie("id"),
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log(result.message)
            return
        }
        console.log(result.message)
    })
}

async function reCommentGet(commentNum){
    const data = await fetch(`${basic}/reply?comment_num=${commentNum}&id=${getCookie("id")}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "token": getCookie("access-token")
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.message)
            return result.data
        }
        console.log(result.message)
    })
    return data
}

export { loginPost, profileGet, duplicateIdPost, joinPost, 
         addressPut, addressGet, 
         boardGet, boardPost, boardDel, boardEdit, 
         commentPost, commentGet, commentDel, commentPut,
         reCommentPost, reCommentGet }