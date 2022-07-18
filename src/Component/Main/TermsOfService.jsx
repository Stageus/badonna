import React from "react"
import H1 from "../Common/H1"
import Text from "../Common/Text"
import P from "../Common/P"
import Button from "../Common/Button"

const TermsOfService = () => {

    return (
        <div id = "TermsOfService">
            <H1 text = "이용 약관 동의"></H1>
            <Text></Text>
            <div>
                <P></P>
                <input type = "checkbox"></input>
                <Button></Button>
                <Button></Button>
            </div>
        </div>
    )
}

export default TermsOfService