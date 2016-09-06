import { addListener, removeListener } from './ListenersActions'
import { addMultipleConnections } from './ConnectionsActions'
import { listenToConnectionList } from 'apis'

export const SETTING_CONNECTION_LIST_LISTENER = 'SETTING_CONNECTION_LIST_LISTENER'
export const REMOVING_CONNECTION_LIST_LISTENER = 'REMOVING_CONNECTION_LIST_LISTENER'
export const SETTING_CONNECTION_LIST_LISTENER_ERROR = 'SETTING_CONNECTION_LIST_LISTENER_ERROR'
export const REMOVING_CONNECTION_LIST_LISTENER_ERROR = 'REMOVING_CONNECTION_LIST_LISTENER_ERROR'
export const SETTING_CONNECTION_LIST_LISTENER_SUCCESS = 'SETTING_CONNECTION_LIST_LISTENER_SUCCESS'
export const REMOVING_CONNECTION_LIST_LISTENER_SUCCESS = 'REMOVING_CONNECTION_LIST_LISTENER_SUCCESS'
export const ADD_NEW_CONNECTION_ID_TO_CONNECTION_LIST = 'ADD_NEW_CONNECTION_ID_TO_CONNECTION_LIST'
export const RESET_NEW_CONNECTIONS_AVAILABLE = 'RESET_NEW_CONNECTIONS_AVAILABLE'

function settingConnectionListListener () {
    return {
        type: SETTING_CONNECTION_LIST_LISTENER
    }
}

function removingConnectionListListener () {
    return {
        type: REMOVING_CONNECTION_LIST_LISTENER
    }
}

function settingConnectionListListenerError (error) {
    console.warn(error)
    return {
        type: SETTING_CONNECTION_LIST_LISTENER_ERROR,
        error: error
    }
}

function removingConnectionListListenerError (error) {
    console.warn(error)
    return {
        type: REMOVING_CONNECTION_LIST_LISTENER_ERROR,
        error: error
    }
}

function settingConnectionListListenerSuccess (connectionIds) {
    return {
        type: SETTING_CONNECTION_LIST_LISTENER_SUCCESS,
        connectionIds
    }
}

function removingConnectionListListenerSuccess () {
    return {
        type: REMOVING_CONNECTION_LIST_LISTENER_SUCCESS
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

export function handleConnectionListListener (appId, listenerOn) {

    let initialFetch = true

    return function (dispatch, getState) {

        if (getState().listeners.connectionList === true && listenerOn) {
            return
        }

        if (listenerOn) {
            dispatch(addListener('connectionList'))
            dispatch(settingConnectionListListener())
        } else {
            dispatch(removeListener('connectionList'))
            dispatch(removingConnectionListListener())
        }

        listenToConnectionList(
            appId, //If we pass in an appId, then we will listen for connections specific to that app
            listenerOn, //Turn listener on or off
            ({connectionList, sortedIds}) => { //callback function to get our connection list.
                if (listenerOn) {
                    dispatch(addMultipleConnections(connectionList))
                    initialFetch === true
                        ? dispatch(settingConnectionListListenerSuccess(sortedIds))
                        : dispatch(addNewConnectionIdToConnectionList(sortedIds[0]))
                } else {
                    dispatch(removingConnectionListListenerSuccess())
                }
            },
            (error) => {
                listenerOn
                    ?   dispatch(settingConnectionListListenerError(error))
                    :   dispatch(removingConnectionListListenerError(error))
            }
        )

    }

}
