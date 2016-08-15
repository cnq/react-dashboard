import axios from 'axios';
import { fireDb } from 'config/constants'

/**
 * saveToConnections() saves a connection to Firebase and returns a
 * connectionId along with a Promise
 *
 * @param {Object} connection
 * @return {String} connectionId, {Promise} connectionPromise
 */
function saveToConnections (connection) {
    //Firebase
    const connectionId = fireDb.ref().child('connections').push().key //Have firebase generate the connectionId for us
    const connectionPromise = fireDb.ref().child(`connections/${connectionId}`).set({...connection, connectionId})
    return {
        connectionId,
        connectionPromise
    }
}

/**
 * saveToAppsConnections() saves, to Firebase, a reference to the connection along with
 * pertinent data under the app's object and returns a firebase reference
 *
 * @param {Object} connection, {String} connectionId
 * @return firebase.ref()
 */
function saveToAppsConnections (connection, connectionId) {
    //Firebase
    return fireDb.ref().child(`appsConnections/${connection.appId}/${connectionId}`)
        .set({...connection, connectionId})
}

/**
 * saveConnection() saves the connection to Firebase or Paperhook
 *
 * @param {Object} app
 * @return {Object} connection, {String} connectionId
 */
export function saveConnection (connection) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        const { connectionId, connectionPromise } = saveToConnections(connection)
        return Promise.all([
            connectionPromise,
            saveToAppsConnections(connection, connectionId)
        ]).then(() => ({...connection, connectionId}))
    } else {
        //Paperhook
        // TODO: This needs to be added.
    }
}

/**
 * deleteFromConnections() deletes a connection from Firebase and returns a Promise
 *
 * @param {String} connectionId
 * @return {Promise} connectionPromise
 */
function deleteFromConnections (connectionId) {
    //Firebase
    const connectionPromise = fireDb.ref(`connections/${connectionId}`).remove()
    return {
        connectionPromise
    }
}

/**
 * deleteFromAppsConnections() deletes the reference to the connection from the app object on Firebase
 *
 * @param {String} connectionId, {String} appId
 * @return firebase.ref()
 */
function deleteFromAppsConnections (connectionId, appId) {
    //Firebase
    return fireDb.ref(`appsConnections/${appId}/${connectionId}`).remove()
}

/**
 * deleteConnection() deletes the connection from Firebase or Paperhook
 *
 * @param {String} connectionId, {String} appId
 * @return {Promise} connectionPromise, {String} error
 */
export function deleteConnection (connectionId, appId) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        const { connectionPromise } = deleteFromConnections(connectionId)
        return Promise.all([
            connectionPromise,
            deleteFromAppsConnections(connectionId, appId)
        ])
            .then(() => {
                console.log("Connection delete succeeded.")
            })
            .catch((error) => {
                console.log("Connection delete failed: " + error.message)
            })
    } else {
        // TODO: This needs to be added
    }
}

/**
 * listenToConnectionList() listens to app connections for updates
 *
 * @param {Function} callback, {Function} errorCallback
 * @return {Function} callback, {Function} errorCallback
 */
export function listenToConnectionList (callback, errorCallback) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        fireDb.ref().child('connections').on('value', (snapshot) => {
            const connectionList = snapshot.val() || {}
            const sortedIds = Object.keys(connectionList).sort((a,b) => {
                return connectionList[b].timestamp - connectionList[a].timestamp
            })
            callback({connectionList, sortedIds})
        }, errorCallback)
    } else {
        //Paperhook
        // TODO: Connections listener needs to be added
    }
}

/**
 * fetchConnection() fetches a specific connection from Firebase or Paperhook
 *
 * @param {String} connectionId
 * @return {Object} connection data
 */
export function fetchConnection (connectionId) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`connections/${connectionId}`).once('value')
            .then((snapshot) => (
                snapshot.val()
            ))
    } else {
        //Paperhook
        //TODO: This needs to be done
    }
}
