import axios from 'axios';
import { formatUserData } from 'helpers/utils'
import { users as actions } from 'actions'
import { store } from '../index.js'



export default function auth (authData) {

    return(
        axios.post("/api/auth/signin", {
            userName: authData.credential.email,
            password: authData.credential.password
            }
        ).then(function(response){
            return {credential: authData.credential, user: response.data}
        })
    )

}

export function checkIfAuthenticated (isAuthenticated, nextIsAuthenticated) {
    //TODO:  This needs to be supported with an api call to check if the user is truely authenticated
    const user = JSON.parse(localStorage.getItem('user'))
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
    console.debug("sign user out");
}

export function saveUser (user) {
    //TODO: This method may not be necessary.  Check to see if we need this
    console.debug("save user");
    return () => user;
}

