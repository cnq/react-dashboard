import axios from 'axios';
import { fireDb } from 'config/constants'

/**
 * saveToApps() saves an app to Firebase and returns an
 * appId along with a Promise
 *
 * @param {Object} app
 * @return {String} appId, {Promise} appPromise
 */
function saveToApps (app) {
    //Firebase
    const appId = fireDb.ref().child('apps').push().key //Have firebase generate the appId for us
    const appPromise = fireDb.ref().child(`apps/${appId}`).set({...app, appId})
    return {
        appId,
        appPromise
    }
}

/**
 * saveToUsersApps() saves, to Firebase, a reference to the app along with
 * pertinent data under the user's object and returns a firebase reference
 *
 * @param {Object} app, {String} appId
 * @return firebase.ref()
 */
function saveToUsersApps (app, appId) {
    //Firebase
    return fireDb.ref().child(`usersApps/${app.uid}/${appId}`)
        .set({...app, appId})
}

/**
 * saveApp() saves the app to Firebase or Paperhook
 *
 * @param {Object} app
 * @return {Object} app, {String} appId
 */
export function saveApp (app) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        const { appId, appPromise } = saveToApps(app)
        return Promise.all([
            appPromise,
            saveToUsersApps(app, appId)
        ]).then(() => ({...app, appId}))
    } else {
        //Paperhook
        return axios({
            method: 'post',
            url: '/api/apps',
            data: {
                backendSiteUri: app.backendSiteUri
            },
            timeout: 60000
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                errorCallback(error);
            })
    }
}

/**
 * deleteFromApps() deletes an app from Firebase and returns a Promise
 *
 * @param {String} appId
 * @return {Promise} appPromise
 */
function deleteFromApps (appId) {
    //Firebase
    const appPromise = fireDb.ref(`apps/${appId}`).remove()
    return {
        appPromise
    }
}

/**
 * deleteFromUsersApps() deletes the reference to the app from the user object on Firebase
 *
 * @param {String} appId, {String} uid
 * @return firebase.ref()
 */
function deleteFromUsersApps (appId, uid) {
    //Firebase
    return fireDb.ref(`usersApps/${uid}/${appId}`).remove()
}

/**
 * deleteApp() deletes the app from Firebase or Paperhook
 *
 * @param {String} appId, {String} uid
 * @return {Promise} appPromise, {String} error
 */
export function deleteApp (appId, uid) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        const { appPromise } = deleteFromApps(appId)
        return Promise.all([
            appPromise,
            deleteFromUsersApps(appId, uid)
        ])
            .then(() => {
                console.log("App delete succeeded.")
            })
            .catch((error) => {
                console.log("App delete failed: " + error.message)
            })
    } else {
        //Paperhook
        return axios({
            method: 'delete',
            url: `/api/apps/${appId}`,
            timeout: 60000
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                errorCallback(error);
            })
    }
}

/**
 * listenToAppList() listens to app list for updates
 *
 * @param {Function} callback
 * @param {Function} errorCallback
 * @return {Function} callback, {Function} errorCallback
 */
export function listenToAppList (userId, listenerOn, callback, errorCallback) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        //If a userId is available, then we will return apps associated with that one
        //user, otherwise we will return all apps.
        const endpoint = userId ? `usersApps/${userId}` : `apps`
        const onValueChange = (snapshot) => {
            const appList = snapshot.val() || {}
            const sortedIds = Object.keys(appList).sort((a,b) => {
                return appList[b].timestamp - appList[a].timestamp
            })
            callback({appList, sortedIds})
        }
        //If listenerOn is true then we'll create a listener to firebase
        if (listenerOn) {
            fireDb.ref().child(endpoint).on('value', onValueChange, errorCallback)
            //If listenerOn is false then we'll remove the listener from firebase
        } else {
            try {
                fireDb.ref().child(endpoint).off('value', onValueChange)
                callback({null, null}) //return the callback so that the function will continue running
            } catch (error) {
                errorCallback(error)
            }
        }
    } else {
        //Paperhook
        return axios.get("/api/apps").then(function (response) {
            const appList = response.data || {}
            const sortedIds = Object.keys(appList).sort((a, b) => {
                return appList[b].timestamp - appList[a].timestamp
            })
            callback({appList, sortedIds});
        }).catch(function (error) {
            errorCallback(error);
        })
    }
}

/**
 * fetchApp() fetches a specific app from Firebase or Paperhook
 *
 * @param {String} appId
 * @return {Object} app data
 */
export function fetchApp (appId) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`apps/${appId}`).once('value')
            .then((snapshot) => (
                snapshot.val()
            ))
    } else {
        //Paperhook
        return axios.get(`/api/apps/${appId}`).then(function (response) {
            return response.data;
        })
    }
}

/**
 * fetchAppsConnections() fetches connections created for a specific app from Firebase or Paperhook
 *
 * @param {String} appId
 * @return {Object} connections data
 */
export function fetchAppsConnections (appId) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`appsConnections/${appId}`).once('value')
            .then((snapshot) => (
                snapshot.val() || {}
            ))
    } else {
        return axios.get(`/api/apps/${appId}/routes`).then(function (response) {
            return response.data;
        })
    }
}
