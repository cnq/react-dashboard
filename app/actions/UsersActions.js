


export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'
export const AUTHENTICATING_USER = 'AUTHENTICATING_USER'
export const FETCHING_USER = 'FETCHING_USER'
export const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR'
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'


const unauthUser = () => ({
    type: UNAUTH_USER
})

const fetchingUser = () => ({
    type: FETCHING_USER
})

const fetchingUserError = (error) => ({
    type: FETCHING_USER_ERROR,
    error: 'Error fetching user'
})

export const authUser = (uid) => ({
    type: AUTH_USER,
    uid
})

export const authenticatingUser = () => ({
    type: AUTHENTICATING_USER
})

export const fetchingUserSuccess = (uid, user, timestamp) => ({
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp
})

export const fetchAndHandleAuthenticatedUser = (authData) => (dispatch) => {
    dispatch(authenticatingUser())
    dispatch(fetchingUser())
    return (
        alert('fetchAndHandleAuthenticatedUser')
    )
}

export const fetchAndHandleUser = (uid) => (dispatch) => {
    dispatch(fetchingUser())
    return (
        alert('fetchAndHandleUser')
    )
}

export function signoutAndUnauth () {
    // Remove data from local storage on signout
    removeFromLocalStorage('auth')
    removeFromLocalStorage('user')

    // Signout and unauth the user
    return function (dispatch) {
        signout()
        dispatch(unauthUser())
    }
}
