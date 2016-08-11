import { appConnections as actions } from 'actions'
import { Map, fromJS } from 'immutable'

const initialState = Map({
    isFetching: true,
    error: ''
})

// TODO: NEED TO ADD THIS IN THERE ->FETCHING_SINGLE_APP_CONNECTION_SUCCESS

export default function apps ( state = initialState, action ) {

    switch ( action.type ) {

        case actions.FETCHING_APP_CONNECTIONS:
            return state.merge({
                isFetching: true
            })

        case actions.FETCHING_APP_CONNECTIONS_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })

        case actions.ADD_SINGLE_APP_CONNECTION:
        case actions.FETCHING_APP_CONNECTIONS_SUCCESS:
            return state.merge({
                isFetching: false,
                error: '',
                [action.app.appId]: action.app
            })

        case actions.FETCHING_SINGLE_APP_CONNECTION_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })

        case actions.REMOVE_APP_CONNECTIONS_FETCHING:
            return state.merge({
                isFetching: false,
                error: ''
            })

        case actions.ADD_MULTIPLE_APP_CONNECTIONS:
            return state.merge(
                action.apps
            )

        default:
            return state

    }

}