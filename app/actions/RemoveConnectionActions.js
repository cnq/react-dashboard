import { deleteConnection } from 'apis'

export const REMOVING_CONNECTION = 'REMOVING_CONNECTION'
export const REMOVE_CONNECTION_ERROR = 'REMOVE_CONNECTION_ERROR'
export const REMOVE_CONNECTION_SUCCESS = 'REMOVE_CONNECTION_SUCCESS'
export const REMOVE_CONNECTION_COMPLETE = 'REMOVE_CONNECTION_COMPLETE'

const removingConnection = (connectionId) => ({
    type: REMOVING_CONNECTION,
    connectionId
})

const removeConnectionError = (error, connectionId) => ({
    type: REMOVE_CONNECTION_ERROR,
    error: 'Error removing app',
    connectionId
})

const removeConnectionSuccess = (connectionId) => ({
    type: REMOVE_CONNECTION_SUCCESS,
    connectionId
})

export const removeConnectionComplete = (connectionId) => ({
    type: REMOVE_CONNECTION_COMPLETE,
    connectionId
})

export const deleteAndHandleConnection = (connectionId, appId) => (dispatch) => {
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
