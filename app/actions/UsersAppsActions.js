import { fetchUsersApps } from 'apis'
import { addMultipleApps } from './AppsActions'

export const FETCHING_USERS_APPS = 'FETCHING_USERS_APPS'
export const FETCHING_USERS_APPS_ERROR = 'FETCHING_USERS_APPS_ERROR'
export const FETCHING_USERS_APPS_SUCCESS = 'FETCHING_USERS_APPS_SUCCESS'
export const ADD_SINGLE_USERS_APP = 'ADD_SINGLE_USERS_APP'

export const fetchingUsersApps = (uid) => ({
    type: FETCHING_USERS_APPS,
    uid
})

export const fetchingUsersAppsError = (error) => ({
    type: FETCHING_USERS_APPS_ERROR,
    error: 'Error fetching user apps'
})

export const fetchingUsersAppsSuccess = (uid, appIds, lastUpdated) => ({
    type: FETCHING_USERS_APPS_SUCCESS,
    uid,
    appIds,
    lastUpdated
})

export const addSingleUsersApp = (uid, appId) => ({
    type: ADD_SINGLE_USERS_APP,
    uid,
    appId
})

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