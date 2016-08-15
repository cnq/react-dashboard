import { addListener } from './ListenersActions'
import { addMultipleApps } from './AppsActions'
import { listenToAppList } from 'apis'

export const SETTING_APP_LIST_LISTENER = 'SETTING_APP_LIST_LISTENER'
export const SETTING_APP_LIST_LISTENER_ERROR = 'SETTING_APP_LIST_LISTENER_ERROR'
export const SETTING_APP_LIST_LISTENER_SUCCESS = 'SETTING_APP_LIST_LISTENER_SUCCESS'
export const ADD_NEW_APP_ID_TO_APP_LIST = 'ADD_NEW_APP_ID_TO_APP_LIST'
export const RESET_NEW_APPS_AVAILABLE = 'RESET_NEW_APPS_AVAILABLE'


function settingAppListListener () {
    return {
        type: SETTING_APP_LIST_LISTENER
    }
}

function settingAppListListenerError (error) {
    console.warn(error)
    return {
        type: SETTING_APP_LIST_LISTENER_ERROR,
        error: error
    }
}

function settingAppListListenerSuccess (appIds) {
    return {
        type: SETTING_APP_LIST_LISTENER_SUCCESS,
        appIds
    }
}

function addNewAppIdToAppList (appId) {
    return {
        type: ADD_NEW_APP_ID_TO_APP_LIST,
        appId
    }
}

export function resetNewAppsAvailable () {
    return {
        type: RESET_NEW_APPS_AVAILABLE
    }
}

export function setAndHandleAppListListener () {

    let initialFetch = true

    return function (dispatch, getState) {

        if (getState().listeners.appList === true) {
            return
        }

        dispatch(addListener('appList'))
        dispatch(settingAppListListener())

        listenToAppList( ({appList, sortedIds}) => {

            dispatch(addMultipleApps(appList))

            initialFetch  === true
                ? dispatch(settingAppListListenerSuccess(sortedIds))
                : dispatch(addNewAppIdToAppList(sortedIds[0]))

        }, (error) => dispatch(settingAppListListenerError(error)))

    }

}