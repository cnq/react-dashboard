import { connections as actions } from 'actions'
import { Map, fromJS } from 'immutable'

const initialState = Map({
    isFetching: true,
    error: ''
})

export default function connections ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.FETCHING_CONNECTION:
            return state.merge({
                isFetching: true
            })
        case actions.FETCHING_CONNECTION_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })
        case actions.ADD_CONNECTION:
        case actions.FETCHING_CONNECTION_SUCCESS:
            return state.merge({
                isFetching: false,
                error: '',
                [action.connection.connectionId]: action.connection
            })
        case actions.REMOVE_CONNECTION_FETCHING:
            return state.merge({
                isFetching: false,
                error: ''
            })
        case actions.ADD_MULTIPLE_CONNECTIONS:
            return state.merge(
                action.connections
            )
        default:
            return state
    }
}
