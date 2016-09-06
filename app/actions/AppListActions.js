import { addListener, removeListener } from './ListenersActions'
import { addMultipleApps } from './AppsActions'
import { listenToAppList } from 'apis'

export const SETTING_APP_LIST_LISTENER = 'SETTING_APP_LIST_LISTENER'
export const REMOVING_APP_LIST_LISTENER = 'REMOVING_APP_LIST_LISTENER'
export const SETTING_APP_LIST_LISTENER_ERROR = 'SETTING_APP_LIST_LISTENER_ERROR'
export const REMOVING_APP_LIST_LISTENER_ERROR = 'REMOVING_APP_LIST_LISTENER_ERROR'
export const SETTING_APP_LIST_LISTENER_SUCCESS = 'SETTING_APP_LIST_LISTENER_SUCCESS'
export const REMOVING_APP_LIST_LISTENER_SUCCESS = 'REMOVING_APP_LIST_LISTENER_SUCCESS'
export const ADD_NEW_APP_ID_TO_APP_LIST = 'ADD_NEW_APP_ID_TO_APP_LIST'
export const RESET_NEW_APPS_AVAILABLE = 'RESET_NEW_APPS_AVAILABLE'

function settingAppListListener () {
    return {
        type: SETTING_APP_LIST_LISTENER
    }
}

function removingAppListListener () {
    return {
        type: REMOVING_APP_LIST_LISTENER
    }
}

function settingAppListListenerError (error) {
    console.warn(error)
    return {
        type: SETTING_APP_LIST_LISTENER_ERROR,
        error: error
    }
}

function removingAppListListenerError (error) {
    console.warn(error)
    return {
        type: REMOVING_APP_LIST_LISTENER_ERROR,
        error: error
    }
}

function settingAppListListenerSuccess (appIds) {
    return {
        type: SETTING_APP_LIST_LISTENER_SUCCESS,
        appIds
    }
}

function removingAppListListenerSuccess () {
    return {
        type: REMOVING_APP_LIST_LISTENER_SUCCESS
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

export function handleAppListListener (userId, listenerOn) {

    let initialFetch = true

    return function (dispatch, getState) {

        if (getState().listeners.appList === true && listenerOn) {
            return
        }

        if (listenerOn) {
            dispatch(addListener('appList'))
            dispatch(settingAppListListener())
        } else {
            dispatch(removeListener('appList'))
            dispatch(removingAppListListener())
        }

        listenToAppList(
            userId, //If we pass in an userId, then we will listen for connections specific to that app
            listenerOn, //Turn listener on or off
            ({appList, sortedIds}) => { //callback function to get our connection list.
                if (listenerOn) {
                    dispatch(addMultipleApps(appList))
                    initialFetch === true
                        ? dispatch(settingAppListListenerSuccess(sortedIds))
                        : dispatch(addNewAppIdToAppList(sortedIds[0]))
                } else {
                    dispatch(removingAppListListenerSuccess())
                }
            },
            (error) => {
                listenerOn
                    ?   dispatch(settingAppListListenerError(error))
                    :   dispatch(removingAppListListenerError(error))
            }
        )

    }

}
