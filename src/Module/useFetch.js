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

export { joinPost }