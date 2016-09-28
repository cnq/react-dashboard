import { applist as actions } from 'actions'

const initialState = {
    isFetching: false,
    error: '',
    apps: []
}

export default function applist ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.APPLIST_INITILIZE:
        case actions.APPLIST_FETCH_START:
        case actions.APPLIST_FETCH_REQUEST:
            return {
                ... state
            }
        case actions.APPLIST_FETCH_SUCCESS:
            return {
                ... state,
        isFetching: false,
        error: action.error,
        apps: action.apps
}
        case actions.APPLIST_FETCH_FAIL:
            return {
                ... state,
            isFetching: false,
            error: action.error
            }
        default:
            return state
    }
}