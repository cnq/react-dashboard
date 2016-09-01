import { fetchAppsConnections } from 'apis'
import { addMultipleConnections } from './ConnectionsActions'

export const FETCHING_APPS_CONNECTIONS = 'FETCHING_APPS_CONNECTIONS'
export const FETCHING_APPS_CONNECTIONS_ERROR = 'FETCHING_APPS_CONNECTIONS_ERROR'
export const FETCHING_APPS_CONNECTIONS_SUCCESS = 'FETCHING_APPS_CONNECTIONS_SUCCESS'
export const ADD_SINGLE_APPS_CONNECTION = 'ADD_SINGLE_APPS_CONNECTION'

export const fetchingAppsConnections = (appId) => ({
    type: FETCHING_APPS_CONNECTIONS,
    appId
})

export const fetchingAppsConnectionsError = (error) => ({
    type: FETCHING_APPS_CONNECTIONS_ERROR,
    error: 'Error fetching user apps'
})

export const fetchingAppsConnectionsSuccess = (appId, connectionIds, lastUpdated) => ({
    type: FETCHING_APPS_CONNECTIONS_SUCCESS,
    appId,
    connectionIds,
    lastUpdated
})

export const addSingleAppsConnection = (appId, connectionId) => ({
    type: ADD_SINGLE_APPS_CONNECTION,
    appId,
    connectionId
})

export function fetchAndHandleAppsConnections (appId) {
    return function (dispatch) {
        dispatch(fetchingAppsConnections(appId))
        return (
            fetchAppsConnections(appId)
                .then((connections) => dispatch(addMultipleConnections(connections)))
                .then(({connections}) => dispatch(
                    fetchingAppsConnectionsSuccess(
                        appId,
                        Object.keys(connections).sort((a,b) => connections[b].timestamp - connections[a].timestamp),
                        Date.now()
                    ))
                )
                .catch((error) => dispatch(fetchingAppsConnectionsError(error)))
        )
    }
}
