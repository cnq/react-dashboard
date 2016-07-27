import { deleteApp } from 'api'

export const REMOVING_APP = 'REMOVING_APP'
export const REMOVE_APP_ERROR = 'REMOVE_APP_ERROR'
export const REMOVE_APP_SUCCESS = 'REMOVE_APP_SUCCESS'
export const REMOVE_APP_COMPLETE = 'REMOVE_APP_COMPLETE'

function removingApp (appId) {
    return {
        type: REMOVING_APP,
        appId
    }
}

function removeAppError (error, appId) {
    return {
        type: REMOVE_APP_ERROR,
        error: 'Error removing app',
        appId
    }
}

function removeAppSuccess (appId) {
    return {
        type: REMOVE_APP_SUCCESS,
        appId
    }
}

export function removeAppComplete (appId) {
    return {
        type: REMOVE_APP_COMPLETE,
        appId
    }
}

export function deleteAndHandleApp (appId) {

    return function (dispatch) {
        
        dispatch(removingApp(appId))
        deleteApp (appId)
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

