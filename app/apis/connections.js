import { fireDb, ajax } from 'config/constants'
import Rx from 'rxjs/Rx'
import isEqual from 'lodash/isEqual'

/**
 * saveToConnections() saves a connection to Firebase and returns a
 * connectionId along with a Promise
 *
 * @param {Object} connection
 * @return {String} connectionId, {Promise} connectionPromise
 */
function saveToConnections (connection) {
    //Firebase
    const connectionId = connection.connectionId ? connection.connectionId : fireDb.ref().child('connections').push().key //Have firebase generate the connectionId for us
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
 * @param {Object} connection
 * @param {String} connectionId
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
 * @param {Object} connection
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
        if(connection.connectionId){
            return ajax({
                method: 'put',
                url: `/api/apps/${connection.appId}/routes/${connection.connectionId}`,
                data: connection,
                timeout: 60000 })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                errorCallback(error);
            })
        
        } else {
            return ajax({
                method: 'post',
                url: `/api/apps/${connection.appId}/routes`,
                data: connection,
                timeout: 60000 })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                errorCallback(error);
            })
        }

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
 * @param {String} connectionId
 * @param {String} appId
 * @return firebase.ref()
 */
function deleteFromAppsConnections (connectionId, appId) {
    //Firebase
    return fireDb.ref(`appsConnections/${appId}/${connectionId}`).remove()
}

/**
 * deleteConnection() deletes the connection from Firebase or Paperhook
 *
 * @param {String} connectionId
 * @param {String} appId
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
        return ajax({
            method: 'delete',
            url: `/api/apps/${appId}/routes/${connectionId}`,
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
 * listenToConnectionList() listens to app connections for updates
 *
 * @param {String} appId
 * @param {Bool} listenerOn
 * @param {Function} callback
 * @param {Function} errorCallback
 * @return {Function} callback, {Function} errorCallback
 */
export function listenToConnectionList (appId, listenerOn, callback, errorCallback) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        //If an appId is available, then we will return connections associated with that one
        //app, otherwise we will return all connection.
        const endpoint = appId ? `appsConnections/${appId}` : `connections`
        const onValueChange = (snapshot) => {
            const connectionList = snapshot.val() || {}
            const sortedIds = Object.keys(connectionList).sort((a,b) => {
                return connectionList[b].timestamp - connectionList[a].timestamp
            })
            callback({connectionList, sortedIds})
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
        //Create Observable stream to watch the app endpoint for updates
        let connectionStream$ = new Rx.Observable.create(
            observer => {
                let interval = setInterval(() => {
                    ajax.get(`/api/apps/${appId}/routes`)
                        .then(
                            response => {
                                const connectionList = response.data || {}
                                const sortedIds = Object.keys(connectionList).sort((a, b) => {
                                    connectionList[b].timestamp - connectionList[a].timestamp
                                })
                                let connections = {connectionList, sortedIds}
                                observer.next(connections)
                            }
                        )
                }, 2000)
                return () => {
                    //Clean up the stream on unsubscribe
                    clearInterval(interval)
                }
            }
        )
        .retry(3)
        
        //Create disposable stream so that we can unsubscribe and clean up the stream later
        let disposable = connectionStream$
        //Only allow through if the current list of sortedIds is not equal to the previous list of sortedIds
            .distinctUntilChanged(
                (a,b) => {
                    return isEqual(a.sortedIds,b.sortedIds)
                },
                connections => {
                    return connections
                }
            )
            //Subscribe to the stream
            .subscribe(
                connections => {
                    callback(connections)
                },
                error => {
                    errorCallback('The following error occurred: ', error)
                }
            )

        if (!listenerOn && disposable) {
            //Unsubscribe from the stream
            disposable.unsubscribe()
        }
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
        return ajax.get(`/api/apps/${appId}/routes/${connectionId}`).then(function (response) {
            return response.data;
        })
    }
}
