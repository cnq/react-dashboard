import { saveApp, fetchApp } from 'apis'
import { deactivateAddApp } from './AddAppActions'
import { addSingleUsersApp } from './UsersAppsActions'

export const FETCHING_APP = 'FETCHING_APP'
export const FETCHING_APP_ERROR = 'FETCHING_APP_ERROR'
export const FETCHING_APP_SUCCESS = 'FETCHING_APP_SUCCESS'
export const REMOVE_APP_FETCHING = 'REMOVE_APP_FETCHING'
export const ADD_APP = 'ADD_APP'
export const ADD_MULTIPLE_APPS = 'ADD_MULTIPLE_APPS'

function fetchingApp () {
    return {
        type: FETCHING_APP
    }
}

function fetchingAppError (error) {
    return {
        type: FETCHING_APP_ERROR,
        error: 'Error fetching app'
    }
}

function fetchingAppSuccess (app) {
    return {
        type: FETCHING_APP_SUCCESS,
        app
    }
}

export function removeAppFetching () {
    return {
        type: REMOVE_APP_FETCHING
    }
}

function addApp (app) {
    return {
        type: ADD_APP,
        app
    }
}

export function appFanout (app) {

    return function (dispatch, getState) {

        const uid = getState().users.authenticatedId

        saveApp (app)
            .then((appWithId) => {
                dispatch(addApp(appWithId))
                dispatch(deactivateAddApp())
                dispatch(addSingleUsersApp(uid, appWithId.appId))
            })
            .catch((error) => {
                console.log('Error in appFanout: ', error)
            })


    }
}

export function addMultipleApps (apps) {
    return {
        type: ADD_MULTIPLE_APPS,
        apps
    }
}

export function fetchAndHandleApp (appId) {

    return function (dispatch) {

        dispatch(fetchingApp())
        fetchApp (appId)
            .then((app) => {
                dispatch(fetchingAppSuccess(app))
            })
            .catch((error) => {
                console.log('Error in fetchAndHandleApp: ', error)
                dispatch(fetchingAppError(error))
            })
        
    }

}
