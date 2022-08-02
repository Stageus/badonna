import { setCookie } from "./cookie"

const joinPost = (id, pw, name, phone_num) => {
    
    fetch("http://3.35.16.191:3000/account", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json" // 내가 요청에 담아서 보내는 데이터들의 형태 & 자료형을 설정
        },
        "body": JSON.stringify({ // api에서 요구하는 값을 넣어줌
            "id": id,
            "pw": pw,
            "name": name,
            "phone_num": phone_num,
        })
    })
        .then(response => response.json())
        .then(result => {
            if (result) {
                return result.message
            }
        })
}
const duplicateIdPost = (id) => {

    fetch("http://3.35.16.191:3000/account/duplicate/id", {
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
            if (result) {
                return false
            }
            return true
        })
}
const loginPost = (id, pw) => {
    
    fetch("http://3.35.16.191:3000/account/login", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json" // 내가 요청에 담아서 보내는 데이터들의 형태 & 자료형을 설정
        },
        "body": JSON.stringify({ // api에서 요구하는 값을 넣어줌
            "id": id,
            "pw": pw
        })
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result) {
                setCookie("access-token", result.token)
                return result.message
            }
        })
}
const profileGet = (token, id) => {
    
    fetch(`http://3.35.16.191:3000/account?id=${id}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "token": token
        },
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.success) {
                return result.data
            }
        })
}

const boardPost = (title, content, place, id) => {

    fetch("http://3.35.16.191:3000/account/board", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json" // 내가 요청에 담아서 보내는 데이터들의 형태 & 자료형을 설정
        },
        "body": JSON.stringify({ // api에서 요구하는 값을 넣어줌
            "title": title,
            "contents": content,
            "place": place,
            "id": id,
            "is_end": 0
        })
    })
        .then(response => response.json())
        .then(result => {
            if (result) {
                
            }
        })
}

export { joinPost, duplicateIdPost, loginPost, profileGet, boardPost }