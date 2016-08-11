import { saveApp, fetchApp } from 'apis'
import { addSingleUsersApp } from './UsersAppsActions'

export const FETCHING_APP_CONNECTIONS = 'FETCHING_APP_CONNECTIONS'
export const FETCHING_SINGLE_APP_CONNECTION = 'FETCHING_SINGLE_APP_CONNECTION'
export const FETCHING_APP_CONNECTIONS_ERROR = 'FETCHING_APP_CONNECTIONS_ERROR'
export const FETCHING_SINGLE_APP_CONNECTION_ERROR = 'FETCHING_SINGLE_APP_CONNECTION_ERROR'
export const FETCHING_APP_CONNECTIONS_SUCCESS = 'FETCHING_APP_CONNECTIONS_SUCCESS'
export const FETCHING_SINGLE_APP_CONNECTION_SUCCESS = 'FETCHING_SINGLE_APP_CONNECTION_SUCCESS'
export const ADD_SINGLE_APP_CONNECTION = 'ADD_SINGLE_APP_CONNECTION'


function fetchingAppConnections (appId) {
    return {
        type: FETCHING_APP_CONNECTIONS,
        appId
    }
}

function fetchingSingleAppConnection (appId, connectionId) {
    return {
        type: FETCHING_SINGLE_APP_CONNECTION,
        appId,
        connectionId
    }
}

function fetchingAppConnectionsError (error) {
    onsole.warn(error)
    return {
        type: FETCHING_APP_CONNECTIONS_ERROR,
        error: 'Error fetching this apps connections'
    }
}

function fetchingSingleAppConnectionError (error) {
    console.warn(error)
    return {
        type: FETCHING_SINGLE_APP_CONNECTION_ERROR,
        error: 'Error fetching this appS connection'
    }
}

function fetchingAppConnectionsSuccess (appId, connectionIds, lastUpdated) {
    return {
        type: FETCHING_APP_CONNECTIONS_SUCCESS,
        appId, 
        connectionIds, 
        lastUpdated
    }
}

function fetchingSingleAppConnectionSuccess (appId, connectionId, lastUpdated) {
    return {
        type: FETCHING_SINGLE_APP_CONNECTION_SUCCESS,
        appId,
        connectionId,
        lastUpdated
    }
}

function addSingleAppConnection (appId, connectionId) {
    return {
        type: ADD_SINGLE_APP_CONNECTION,
        appId, 
        connectionId
    }
}

export function appConnectionFanout (app) {
    return function (dispatch, getState) {
        saveConnection (app)
            .then((appWithId) => {
                dispatch(addConnection(appWithId))
                dispatch(addSingleAppConnection(appId, connectionId))
            })
            .catch((error) => {
                console.log('Error in appConnectionFanout: ', error)
            })
    }
}

export function fetchAndHandleSingleAppConnection (appId, connectionId) {
    return function (dispatch) {
        dispatch(fetchingSingleAppConnection())
        fetchSingleAppConnection (appId, connectionId)
            .then((connection) => {
                dispatch(fetchingSingleAppConnectionSuccess(connection))
            })
            .catch((error) => {
                console.log('Error in fetchAndHandleSingleAppConnection: ', error)
                dispatch(fetchingSingleAppConnectionError(error))
            })
    }
}

export function fetchAndHandleAppConnections (appId) {
    return function (dispatch) {
        dispatch(fetchingAppConnections())
        return (
            fetchAppConnections (appId)
                .then(({connections}) => { dispatch(
                        fetchingAppConnectionsSuccess(
                            appId,
                            Object.keys(connections).sort((a,b) => connections[b].timestamp - connections[a].timestamp), 
                            lastUpdated
                        )
                )})
                .catch((error) => {
                    console.log('Error in fetchAndHandleAppConnections: ', error)
                    dispatch(fetchingAppConnectionsError(error))
                })
        )
    }
}
