import { fetchUser } from 'api'
import auth, { signout, saveUser } from 'helpers/auth'
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

export function authUser (uid) {
    return {
        type: AUTH_USER,
        uid
    }
}

function unauthUser () {
    return {
        type: UNAUTH_USER
    }
}

function fetchingUser () {
    return {
        type: FETCHING_USER
    }
}

function fetchingUserError (error) {
    console.warn(error)
    return {
        type: FETCHING_USER_ERROR,
        error: 'Error fetching user'
    }
}

export function fetchingUserSuccess (uid, user, timestamp) {
    return {
        type: FETCHING_USER_SUCCESS,
        uid,
        user,
        timestamp
    }
}

export function fetchAndHandleAuthenticatedUser (authData) {

    return function (dispatch) {
        dispatch(fetchingUser())
        return (
            auth(authData)
                .then((results) => {

                    const user = results.user

                    // Format auth data
                    const authData = formatAuthData(results.credential.provider, null, null, null, results.credential.email, results.credential.password)

                    // Store the authData credentials in localStorage as a string by
                    // using JSON.stringify
                    localStorage.setItem('auth', JSON.stringify(authData))

                    // Format user data
                    const userData = formatUserData(user.displayName, user.photoURL, user.uid)

                    localStorage.setItem('user', JSON.stringify(userData))

                    // Fetch User
                    return dispatch(fetchingUserSuccess(user.uid, userData, Date.now()))

                })
                .then(({user}) => saveUser(user))
                .then((user) => dispatch(authUser(user.uid)))
                .catch((error) => dispatch(fetchingUserError(error)))
        )
    }
}

export function signoutAndUnauth () {

    // Remove the credential data from local storage
    localStorage.removeItem('auth')
    localStorage.removeItem('user')

    // Signout and unauth user
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