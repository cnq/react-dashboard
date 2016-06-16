import firebase from 'firebase/firebase-browser'
import {
    fireApp,
    fireDb,
    fireAuth,
    FACEBOOK,
    GOOGLE,
    GITHUB,
    TWITTER
} from 'config/constants'
import { formatUserData } from 'helpers/utils'
import { users as actions } from 'actions'
import { store } from '../index.js'


function getProvider (authData) {
    const {provider, accessToken, idToken, secret} = authData.credential

    switch (provider) {
        case FACEBOOK:
            return (
                accessToken
                    ?  firebase.auth.FacebookAuthProvider.credential(accessToken)
                    :  new firebase.auth.FacebookAuthProvider()
            )
        case GOOGLE:
            return (
                accessToken
                    ?  firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
                    :  new firebase.auth.GoogleAuthProvider()
            )
        case GITHUB:
            return (
                accessToken
                    ?  firebase.auth.GithubAuthProvider.credential(accessToken)
                    :  new firebase.auth.GithubAuthProvider()
            )
        case TWITTER:
            return (
                accessToken
                    ?  firebase.auth.TwitterAuthProvider.credential(accessToken, secret)
                    :  new firebase.auth.TwitterAuthProvider()
            )
        default:
            return null
    }
}

export default function auth (authData) {

    const { accessToken } = authData.credential
    const user = fireAuth.currentUser

    //Is the user authenticated?
    if (!user) {
        const provider = getProvider(authData)
        if (accessToken) {
            // If we have a token, authenticate with token and attach the
            // returned user object and pass it on with the authData object
            return (
                fireAuth.signInWithCredential(provider)
                    .then ((user) => {
                        return {credential: authData.credential, user: user}
                    })
            )

        } else {
            //Start authentication flow
            return fireAuth.signInWithPopup(provider)
        }
    } else {
        signout()
    }

}

export function checkIfAuthenticated (isAuthenticated, nextIsAuthenticated) {
    const user = fireAuth.currentUser
    //Is the user authenticated?
    if (user === null){
        return false
    } else if (isAuthenticated === false) {
        if (nextIsAuthenticated !== true) {
            return false
        }
        const userData = formatUserData(user.displayName, user.photoURL, user.uid)
        store.dispatch(actions.authUser(user.uid))
        store.dispatch(actions.fetchingUserSuccess(user.uid, userData, Date.now()))
    }
    return true
}

export function signout () {
    fireAuth.signOut()
}

export function saveUser (user) {
    return fireDb.ref().child(`users/${user.uid}`)
        .set(user)
        .then(() => user)
}

