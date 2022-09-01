import { profileGet } from "../../Module/fetch"

export const PROFILE = "PROFILE"

const profile = () => async dispatch => {
    const user = await profileGet()
    return dispatch({
        type: PROFILE,
        user: user
    })
}
export { profile }