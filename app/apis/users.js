import axios from 'axios';
import { fireDb } from 'config/constants'

/**
 * fetchUser() fetches user data from Firebase or Paperhook
 *
 * @param {String} uid
 * @return {Object} user data
 */
export function fetchUser (uid) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`users/${uid}`).once('value')
            .then((snapshot) => (
                snapshot.val()
            ))
    } else {
        //Paperhook
        return axios.get("/api/auth/authenticateduser").then(function (response) {
            return response.data;
        })
    }
}

/**
 * fetchUsersApps() fetches user created apps from Firebase or Paperhook
 *
 * @param {String} uid
 * @return {Object} users apps data
 */
export function fetchUsersApps (uid) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`usersApps/${uid}`).once('value')
            .then((snapshot) => (
                snapshot.val() || {}
            ))
    } else {
        //Paperhook
        console.debug("fetchUsersApps...")
    }
}
