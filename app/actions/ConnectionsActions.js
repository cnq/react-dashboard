import { saveConnection, fetchConnection } from 'apis'
import { addSingleAppsConnection } from './AppsConnectionsActions'

export const FETCHING_CONNECTION = 'FETCHING_CONNECTION'
export const FETCHING_CONNECTION_ERROR = 'FETCHING_CONNECTION_ERROR'
export const FETCHING_CONNECTION_SUCCESS = 'FETCHING_CONNECTION_SUCCESS'
export const REMOVE_CONNECTION_FETCHING = 'REMOVE_CONNECTION_FETCHING'
export const ADD_CONNECTION = 'ADD_CONNECTION'
export const ADD_MULTIPLE_CONNECTIONS = 'ADD_MULTIPLE_CONNECTIONS'

// see apps actions for reference
function fetchingConnection () {
    return {
        type: FETCHING_CONNECTION
    }
}

function fetchingConnectionError (error) {
    onsole.warn(error)
    return {
        type: FETCHING_CONNECTION_ERROR,
        error: 'Error fetching connection'
    }
}

function fetchingConnectionSuccess (connection) {
    return {
        type: FETCHING_CONNECTION_SUCCESS,
        connection
    }
}

export function removeConnectionFetching () {
    return {
        type: REMOVE_CONNECTION_FETCHING
    }
}

function addConnection (connection) {
    return {
        type: ADD_CONNECTION,
        connection
    }
}

export function connectionFanout (connection) {
    return function (dispatch, getState) {

        const appId = getState().apps.appId

        saveConnection (connection)
            .then((connectionWithId) => {
                dispatch(addConnection(connectionWithId))
                dispatch(addSingleAppsConnection(appId, connectionWithId.connectionId))
            })
            .catch((error) => {
                console.log('Error in connectionFanout: ', error)
            })
    }
}

export function addMultipleConnections (connections) {
    return {
        type: ADD_MULTIPLE_CONNECTIONS,
        connections
    }
}

export function fetchAndHandleConnection (connectionId) {
    return function (dispatch) {
        dispatch(fetchingConnection())
        fetchConnection (connectionId)
            .then((connection) => {
                dispatch(fetchingConnectionSuccess(connection))
            })
            .catch((error) => {
                console.log('Error in fetchAndHandleApp: ', error)
                dispatch(fetchingConnectionError(error))
            })
    }
}
