import { apps as actions } from 'actions'
import { Map, fromJS } from 'immutable'

const initialState = Map({
    isFetching: true, //TODO: check whether this should be defaulted to true
    error: ''
})

export default function apps ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.FETCHING_APP:
            return state.merge({
                isFetching: true
            })
        case actions.FETCHING_APP_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })
        case actions.ADD_APP:
        case actions.FETCHING_APP_SUCCESS:
            return state.merge({
                isFetching: false,
                error: '',
                [action.app.appId]: action.app
            })
        case actions.REMOVE_APP_FETCHING:
            return state.merge({
                isFetching: false,
                error: ''
            })
        case actions.ADD_MULTIPLE_APPS:
            return state.merge(
                action.apps
            )
        default:
            return state
    }
}
