import useFetch from "../../Module/fetch"

export const TEST = "TEST"

const test = () => async dispatch => {
    const info = await useFetch("https://jsonplaceholder.typicode.com/posts")
    return dispatch({
        type: TEST,
        info: info
    })
}

export { test }