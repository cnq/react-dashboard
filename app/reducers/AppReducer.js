import { app as actions } from 'actions'

const initialState = {
    isCreating: false,
    error: '',
    backendSiteUri: ''
}

export default function applist ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.APP_CREATE_INITILIZE:
        case actions.APP_CREATE_START:
        case actions.APP_CREATE_REQUEST:
        case actions.APP_CREATE_SUCCESS:
        case actions.APP_CREATE_FAIL:
            return {
                ... state
            }
        default:
            return state
    }
}