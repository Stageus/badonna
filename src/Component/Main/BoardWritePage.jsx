import React from "react"
import Text from "../Common/Text"
import Button from "../Common/Button"

const BoardWritePage = () => {

    return (
        <main>
            <div>
                <div>
                    <Text/>
                    <Text/>
                    <Button text = "주소 즐겨찾기" name = "address"/>
                </div>
                <div>
                    <Text/>
                </div>
                <Button text = "게시글 등록"/>
            </div>
        </main>
    )
}

export default BoardWritePage