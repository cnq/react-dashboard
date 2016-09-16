import { saveApp, fetchApp } from 'apis'
import { deactivateAddAppCard } from './UpdateAddAppCardActions'
import { addSingleUsersApp } from './UsersAppsActions'

export const FETCHING_APP = 'FETCHING_APP'
export const FETCHING_APP_ERROR = 'FETCHING_APP_ERROR'
export const FETCHING_APP_SUCCESS = 'FETCHING_APP_SUCCESS'
export const REMOVE_APP_FETCHING = 'REMOVE_APP_FETCHING'
export const ADD_APP = 'ADD_APP'
export const ADD_MULTIPLE_APPS = 'ADD_MULTIPLE_APPS'

const fetchingApp = () => ({
    type: FETCHING_APP
})

const fetchingAppError = (error) => ({
    type: FETCHING_APP_ERROR,
    error: 'Error fetching app'
})

const fetchingAppSuccess = (app) => ({
    type: FETCHING_APP_SUCCESS,
    app
})

export const removeAppFetching = () => ({
    type: REMOVE_APP_FETCHING
})

const addApp = (app) => ({
    type: ADD_APP,
    app
})

export const addMultipleApps = (apps) => ({
    type: ADD_MULTIPLE_APPS,
    apps
})

export const appFanout = (app) => (dispatch, getState) => {
    const uid = getState().users.authenticatedId
    saveApp (app)
        .then((appWithId) => {
            dispatch(addApp(appWithId))
            dispatch(deactivateAddAppCard())
            dispatch(addSingleUsersApp(uid, appWithId.appId))
        })
        .catch((error) => {
            console.log('Error in appFanout: ', error)
        })
}

export const fetchAndHandleApp = (appId) => (dispatch) => {
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
