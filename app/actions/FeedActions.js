import { addListener } from './ListenersActions'
import { addMultipleApps } from './AppsActions'
import { listenToFeed } from 'api'

export const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
export const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
export const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
export const ADD_NEW_APP_ID_TO_FEED = 'ADD_NEW_APP_ID_TO_FEED'
export const RESET_NEW_APPS_AVAILABLE = 'RESET_NEW_APPS_AVAILABLE'


function settingFeedListener () {
    return {
        type: SETTING_FEED_LISTENER
    }
}

function settingFeedListenerError (error) {
    console.warn(error)
    return {
        type: SETTING_FEED_LISTENER_ERROR,
        error: error
    }
}

function settingFeedListenerSuccess (appIds) {
    return {
        type: SETTING_FEED_LISTENER_SUCCESS,
        appIds
    }
}

function addNewAppIdToFeed (appId) {
    return {
        type: ADD_NEW_APP_ID_TO_FEED,
        appId
    }
}

export function resetNewAppsAvailable () {
    return {
        type: RESET_NEW_APPS_AVAILABLE
    }
}

export function setAndHandleFeedListener () {

    let initialFetch = true

    return function (dispatch, getState) {

        if (getState().listeners.feed === true) {
            return
        }

        dispatch(addListener('feed'))
        dispatch(settingFeedListener())

        listenToFeed(({feed, sortedIds}) => {

            dispatch(addMultipleApps(feed))

            initialFetch  === true
                ? dispatch(settingFeedListenerSuccess(sortedIds))
                : dispatch(addNewAppIdToFeed(sortedIds[0]))

        }, (error) => dispatch(settingFeedListenerError(error)))

    }

}