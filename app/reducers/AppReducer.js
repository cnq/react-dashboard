import { appActions } from 'actions'
import applist from './AppListReducer'

const addAppInitialState = {
    isCreating: false,
    error: '',
    backendSiteUri: '',
    app: null
}

export function addApp ( state = addAppInitialState, action ) {
    switch ( action.type ) {
        case appActions.APP_CREATE_INITILIZE:
            return {
                ... state,
                backendSiteUri: action.backendSiteUri,
                isCreating: true,
                error: '',
                app: null
            }
        case appActions.APP_CREATE_START:
            return {
                ... state
            }
        case appActions.APP_CREATE_REQUEST:
            return {
                ... state
            }
        case appActions.APP_CREATE_SUCCESS:
            return {
                ... state,
                isCreating: false
            }
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
            return {
                ... state,
                app: action.app,
                isDeleting: true
            }
        case appActions.APP_DELETE_START:
            return {
                ... state
            }
        case appActions.APP_DELETE_REQUEST:
            return {
                ... state
            }
        case appActions.APP_DELETE_SUCCESS:
            return {
                ... state,
                isDeleting: false
            }
        case appActions.APP_DELETE_FAIL:
            return {
                ... state,
                isDeleting: false
            }
        default:
            return state
    }
}