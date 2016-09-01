import { fetchUser } from 'apis'
import auth, { signout, saveUser } from 'helpers/auth'
import { saveToLocalStorage, removeFromLocalStorage } from 'helpers/localStorage'
import { formatAuthData, formatUserData } from 'helpers/utils'
import {
    GOOGLE,
    TWITTER,
    EMAIL
} from 'config/constants'

export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'
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

export const fetchingUserSuccess = (uid, user, timestamp) => ({
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp
})

export function fetchAndHandleAuthenticatedUser (authData) {
    return function (dispatch) {
        dispatch(fetchingUser())
        return (
            auth(authData)
                .then((results) => {
                    // Pull credentials and user data from result
                    const provider = results.credential.provider
                    const email = provider === EMAIL ? results.credential.email : null
                    const password = provider === EMAIL ? results.credential.password : null
                    const accessToken = provider !== EMAIL ? results.credential.accessToken : null
                    const idToken = provider === GOOGLE ? results.credential.idToken : null
                    const secret = provider === TWITTER ? results.credential.secret : null
                    const user = results.user

                    // Format data
                    const authData = formatAuthData(provider, email, password, accessToken, idToken, secret)
                    const userData = formatUserData(user.displayName, user.photoURL, user.uid)

                    // Save data to local storage
                    saveToLocalStorage('auth', authData)
                    saveToLocalStorage('user', userData)

                    // Fetch user
                    return dispatch(fetchingUserSuccess(user.uid, userData, Date.now()))

                })
                .then(({user}) => saveUser(user))
                .then((user) => dispatch(authUser(user.uid)))
                .catch((error) => dispatch(fetchingUserError(error)))
        )
    }
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

export function fetchAndHandleUser (uid) {
    return function (dispatch) {
       dispatch(fetchingUser())
        return (
            fetchUser(uid)
                .then((user) => dispatch(fetchingUserSuccess(uid, user, Date.now())))
                .catch((error) => dispatch(fetchingUserError(error)))
        )
    }
}
