import { saveConnection, fetchConnection } from 'apis'
import { addSingleAppsConnection } from './AppsConnectionsActions'

export const FETCHING_CONNECTION = 'FETCHING_CONNECTION'
export const FETCHING_CONNECTION_ERROR = 'FETCHING_CONNECTION_ERROR'
export const FETCHING_CONNECTION_SUCCESS = 'FETCHING_CONNECTION_SUCCESS'
export const REMOVE_CONNECTION_FETCHING = 'REMOVE_CONNECTION_FETCHING'
export const ADD_CONNECTION = 'ADD_CONNECTION'
export const ADD_MULTIPLE_CONNECTIONS = 'ADD_MULTIPLE_CONNECTIONS'

const fetchingConnection = () => ({
    type: FETCHING_CONNECTION
})

const fetchingConnectionError = (error) => ({
    type: FETCHING_CONNECTION_ERROR,
    error: 'Error fetching connection'
})

const fetchingConnectionSuccess = (connection) => ({
    type: FETCHING_CONNECTION_SUCCESS,
    connection
})

const addConnection = (connection) => ({
    type: ADD_CONNECTION,
    connection
})

export const removeConnectionFetching = () => ({
    type: REMOVE_CONNECTION_FETCHING
})

export const addMultipleConnections = (connections) => ({
    type: ADD_MULTIPLE_CONNECTIONS,
    connections
})

export const connectionFanout = (connection) => (dispatch, getState) => {
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

export const fetchAndHandleConnection = (connectionId) => (dispatch) => {
    dispatch(fetchingConnection())
    fetchConnection (connectionId)
        .then((connection) => {
            dispatch(fetchingConnectionSuccess(connection))
        })
        .catch((error) => {
            console.log('Error in fetchAndHandleConnection: ', error)
            dispatch(fetchingConnectionError(error))
        })
}
