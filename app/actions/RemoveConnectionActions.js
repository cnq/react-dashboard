import { deleteConnection } from 'apis'

export const REMOVING_CONNECTION = 'REMOVING_CONNECTION'
export const REMOVE_CONNECTION_ERROR = 'REMOVE_CONNECTION_ERROR'
export const REMOVE_CONNECTION_SUCCESS = 'REMOVE_CONNECTION_SUCCESS'
export const REMOVE_CONNECTION_COMPLETE = 'REMOVE_CONNECTION_COMPLETE'

function removingConnection (connectionId) {
    return {
        type: REMOVING_CONNECTION,
        connectionId
    }
}

function removeConnectionError (error, connectionId) {
    return {
        type: REMOVE_CONNECTION_ERROR,
        error: 'Error removing app',
        connectionId
    }
}

function removeConnectionSuccess (connectionId) {
    return {
        type: REMOVE_CONNECTION_SUCCESS,
        connectionId
    }
}

export function removeConnectionComplete (connectionId) {
    return {
        type: REMOVE_CONNECTION_COMPLETE,
        connectionId
    }
}

export function deleteAndHandleConnection (connectionId, appId) {
    return function (dispatch) {
        dispatch(removingConnection(connectionId))
        deleteConnection (connectionId, appId)
            .then(() => {
                dispatch(removeConnectionSuccess(connectionId))
                dispatch(removeConnectionComplete(connectionId))
            })
            .catch((error) => {
                console.log('Error in deleteAndHandleConnection: ', error)
                dispatch(removeConnectionError(error, connectionId))
            })
    }
}
