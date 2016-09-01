import { deleteApp } from 'apis'

export const REMOVING_APP = 'REMOVING_APP'
export const REMOVE_APP_ERROR = 'REMOVE_APP_ERROR'
export const REMOVE_APP_SUCCESS = 'REMOVE_APP_SUCCESS'
export const REMOVE_APP_COMPLETE = 'REMOVE_APP_COMPLETE'

const removingApp = (appId) => ({
    type: REMOVING_APP,
    appId
})

const removeAppError = (error, appId) => ({
    type: REMOVE_APP_ERROR,
    error: 'Error removing app',
    appId
})

const removeAppSuccess = (appId) => ({
    type: REMOVE_APP_SUCCESS,
    appId
})

export const removeAppComplete = (appId) => ({
    type: REMOVE_APP_COMPLETE,
    appId
})

export function deleteAndHandleApp (appId, uid) {
    return function (dispatch) {
        dispatch(removingApp(appId))
        deleteApp (appId, uid)
            .then(() => {
                dispatch(removeAppSuccess(appId))
                dispatch(removeAppComplete(appId))
            })
            .catch((error) => {
                console.log('Error in deleteAndHandleApp: ', error)
                dispatch(removeAppError(error, appId))
            })
    }
}
