import { addListener } from './ListenersActions'
import { addMultipleConnections } from './ConnectionsActions'
import { listenToConnectionList } from 'apis'

export const SETTING_CONNECTION_LIST_LISTENER = 'SETTING_CONNECTION_LIST_LISTENER'
export const SETTING_CONNECTION_LIST_LISTENER_ERROR = 'SETTING_CONNECTION_LIST_LISTENER_ERROR'
export const SETTING_CONNECTION_LIST_LISTENER_SUCCESS = 'SETTING_CONNECTION_LIST_LISTENER_SUCCESS'
export const ADD_NEW_CONNECTION_ID_TO_CONNECTION_LIST = 'ADD_NEW_CONNECTION_ID_TO_CONNECTION_LIST'
export const RESET_NEW_CONNECTIONS_AVAILABLE = 'RESET_NEW_CONNECTIONS_AVAILABLE'


function settingConnectionListListener () {
    return {
        type: SETTING_CONNECTION_LIST_LISTENER
    }
}

function settingConnectionListListenerError (error) {
    console.warn(error)
    return {
        type: SETTING_CONNECTION_LIST_LISTENER_ERROR,
        error: error
    }
}

function settingConnectionListListenerSuccess (connectionIds) {
    return {
        type: SETTING_CONNECTION_LIST_LISTENER_SUCCESS,
        connectionIds
    }
}

function addNewConnectionIdToConnectionList (connectionId) {
    return {
        type: ADD_NEW_CONNECTION_ID_TO_CONNECTION_LIST,
        connectionId
    }
}

export function resetNewConnectionsAvailable () {
    return {
        type: RESET_NEW_CONNECTIONS_AVAILABLE
    }
}

export function setAndHandleConnectionListListener () {

    let initialFetch = true

    return function (dispatch, getState) {

        if (getState().listeners.connectionList === true) {
            return
        }

        dispatch(addListener('connectionList'))
        dispatch(settingConnectionListListener())

        listenToConnectionList( ({connectionList, sortedIds}) => {

            dispatch(addMultipleConnections(connectionList))

            initialFetch  === true
                ? dispatch(settingConnectionListListenerSuccess(sortedIds))
                : dispatch(addNewConnectionIdToConnectionList(sortedIds[0]))

        }, (error) => dispatch(settingConnectionListListenerError(error)))

    }

}