import firebase from 'firebase/firebase-browser'
import { loadFromLocalStorage } from 'helpers/localStorage'
import {
    ajax,
    fireApp,
    fireDb,
    fireAuth,
    FACEBOOK,
    GOOGLE,
    GITHUB,
    TWITTER,
    EMAIL
} from 'config/constants'
import { formatUserData } from 'helpers/utils'
import { users as actions } from 'actions'
import configureStore from 'config/store'


function getProvider (authData) {

    const {provider, accessToken, idToken, secret, email, password} = authData.credential

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
        case EMAIL:
            return (
                email && password
                    ?  provider
                    :  console.log('there was an issue logging in with email') // TODO: Handle email login issue
            )
        default:
            return null
    }
}

export default function auth (authData) {

    const { accessToken, email, password } = authData.credential
    

    if (process.env.NODE_ENV !== 'production') {
        const user = fireAuth.currentUser
        //firebase
        //Is the user authenticated?
        if (!user) {
            const provider = getProvider(authData)
            if (accessToken || (email && password)) {
                // If we have a token, authenticate with token and attach the
                // returned user object and pass it on with the authData object
                if (provider !== EMAIL) {
                    //authenticate via federated identity provider
                    return (
                        fireAuth.signInWithCredential(provider)
                            .then((user) => {
                                return {credential: authData.credential, user: user}
                            }, function (error) {
                                console.warn('signInWithCredential() error: ', error)
                            })
                    )
                } else {
                    //authenticate via email
                    return (
                        fireAuth.signInWithEmailAndPassword(email, password)
                            .then((user) => {
                                return {credential: authData.credential, user: user}
                            }, function (error) {
                                console.warn('signInWithEmailAndPassword() error: ', error)
                            })
                    )
                }
            } else {
                //Start authentication flow
                if (provider !== EMAIL) {
                    return fireAuth.signInWithPopup(provider)
                } else {
                    return fireAuth.createUserWithEmailAndPassword(email, password)
                        .catch(function(error) {
                            console.warn('createUserWithEmailAndPassword() error: ', error)
                        })
                }
            }
        } else {
            signout()
        }
    }  else {
        //paperhook
        var user = loadFromLocalStorage('user')

        if (user) {
            return (
                ajax.get("/api/auth/authenticateduser").then(function (response) {
                    if(response.data.isAuthenticated) {
                        return {credential: authData.credential, user: response.data}
                    } else {
                        signout()
                    }
                }
                )
                )
            } else {
            return (
                ajax.post("/api/auth/signin", {
                    userName: email,
                    password: password
                }
                ).then(function (response) {
                    return {credential: authData.credential, user: response.data}
                })
                )
            }
    }

}

export function checkIfAuthenticated (isAuthenticated, nextIsAuthenticated) {
    const store = configureStore()

    //TODO:  This needs to be supported with an api call to check if the user is truely authenticated
    const user =
        process.env.NODE_ENV !== 'production'
            ? fireAuth.currentUser  //firebase
            : JSON.parse(localStorage.getItem('user')) //paperhook
    
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
    //TODO: Add server side sign out
    if (process.env.NODE_ENV !== 'production') {
        //firebase
        fireAuth.signOut()
            .then(function() {
                console.log('signout() success')
            }, function(error) {
                console.warn('signout() error: ', error)
            })
    } else {
        //paperhook
        console.debug("sign user out");
    }
}

export function saveUser (user) {
    //TODO: This method may not be necessary.  Check to see if we need this
    if (process.env.NODE_ENV !== 'production') {
        //firebase
        return fireDb.ref().child(`users/${user.uid}`)
            .set(user)
            .then(() => user)
    } else {
        //paperhook
        console.debug("save user");
        return () => user;
    }
}