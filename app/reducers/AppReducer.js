import { appActions } from 'actions'
import applist from './AppListReducer'

const addAppInitialState = {
    isCreating: false,
    error: '',
    backendSiteUri: ''
}

export function addApp ( state = addAppInitialState, action ) {
    switch ( action.type ) {
        case appActions.APP_CREATE_INITILIZE:
        case appActions.APP_CREATE_START:
            return {
                ... state,
                backendSiteUri: action.backendSiteUri,
                isCreating: true
            }
        case appActions.APP_CREATE_REQUEST:
            return {
                ... state,
                backendSiteUri: action.backendSiteUri,
                isCreating: true
            }
        case appActions.APP_CREATE_SUCCESS:
        case appActions.APP_CREATE_FAIL:
            return {
                ... state,
                isCreating: false,
                error: action.error
            }
        default:
            return state
    }
}


const deleteAppInitialState = {
        isDeleting: false,
        error: '',
        app: null
    }

export function deleteApp ( state = deleteAppInitialState, action ) {
    switch ( action.type ) {
        case appActions.APP_DELETE_INITILIZE:
        case appActions.APP_DELETE_START:
            return {
                ... state,
                app: action.app,
                isDeleting: true
            }
        case appActions.APP_DELETE_REQUEST:
            return {
                ... state,
                app: action.app,
                isDeleting: true
            }
        case appActions.APP_DELETE_SUCCESS:
        case appActions.APP_DELETE_FAIL:
            return {
                ... state,
                isDeleting: false,
                error: action.error
            }
        default:
            return state
    }
}