import useFetch from "../../Module/fetch"

export const PROFILE = "PROFILE"

const profile = () => async dispatch => {
    const user = await useFetch("https://jsonplaceholder.typicode.com/posts/1")
    return dispatch({
        type: PROFILE,
        user: user
    })
}
export { profile }