import { applist as actions } from 'actions'
import { fromJS } from 'immutable'

const initialState = fromJS({
    isFetching: false,
    error: '',
    appIds: []
})

export default function applist ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.APPLIST_INITILIZE:
        case actions.APPLIST_FETCH_START:
        case actions.APPLIST_FETCH_REQUEST:
        case actions.APPLIST_FETCH_SUCCESS:
        case actions.APPLIST_FETCH_FAIL:
            return state.merge({
                isFetching: action.isFetching,
                error: action.error,
                appIds: action.appIds
            })
        default:
            return state
    }
}