import { fetchUsersApps } from 'helpers/api'
import { addMultipleApps } from './AppsActions'

export const FETCHING_USERS_APPS = 'FETCHING_USERS_APPS'
export const FETCHING_USERS_APPS_ERROR = 'FETCHING_USERS_APPS_ERROR'
export const FETCHING_USERS_APPS_SUCCESS = 'FETCHING_USERS_APPS_SUCCESS'
export const ADD_SINGLE_USERS_APP = 'ADD_SINGLE_USERS_APP'

export function fetchingUsersApps (uid) {
    return {
        type: FETCHING_USERS_APPS,
        uid
    }
}

export function fetchingUsersAppsError (error) {
    console.warn(error)
    return {
        type: FETCHING_USERS_APPS_ERROR,
        error: 'Error fetching user apps'
    }
}

export function fetchingUsersAppsSuccess (uid, appIds, lastUpdated) {
    return {
        type: FETCHING_USERS_APPS_SUCCESS,
        uid,
        appIds,
        lastUpdated
    }
}

export function addSingleUsersApp (uid, appId) {
    return {
        type: ADD_SINGLE_USERS_APP,
        uid,
        appId
    }
}

export function fetchAndHandleUsersApps (uid) {
    return function (dispatch) {
        dispatch(fetchingUsersApps(uid))
        return (
            fetchUsersApps(uid)
                .then((apps) => dispatch(addMultipleApps(apps)))
                .then(({apps}) => dispatch(
                    fetchingUsersAppsSuccess(
                        uid,
                        Object.keys(apps).sort((a,b) => apps[b].timestamp - apps[a].timestamp),
                        Date.now()
                    ))
                )
                .catch((error) => dispatch(fetchingUsersAppsError(error)))
        )
    }
}