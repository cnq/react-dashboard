import { app as actions } from 'actions'
import applist from './AppListReducer'

const initialState = {
    isCreating: false,
    error: '',
    backendSiteUri: ''
}

export default function app ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.APP_CREATE_INITILIZE:
        case actions.APP_CREATE_START:
            return {
                ... state,
                backendSiteUri: action.backendSiteUri,
                isCreating: true
            }
        case actions.APP_CREATE_REQUEST:
            return {
                ... state,
                backendSiteUri: action.backendSiteUri,
                isCreating: true
            }
        case actions.APP_CREATE_SUCCESS:
        case actions.APP_CREATE_FAIL:
            return {
                ... state,
                isCreating: false,
                error: action.error
            }
        default:
            return state
    }
}