import { connectionList as actions } from 'actions'
import { List, fromJS } from 'immutable'

const initialState = fromJS({
    isFetching: false,
    error: '',
    newConnectionsAvailable: false,
    newConnectionsToAdd: [],
    connectionIds: []
})

export default function connectionList ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.SETTING_CONNECTION_LIST_LISTENER:
            return state.merge({
                isFetching: true
            })
        case actions.REMOVING_CONNECTION_LIST_LISTENER:
            return state.merge({
                isFetching: false
            })
        case actions.SETTING_CONNECTION_LIST_LISTENER_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })
        case actions.REMOVING_CONNECTION_LIST_LISTENER_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })
        case actions.SETTING_CONNECTION_LIST_LISTENER_SUCCESS:
            return state.merge({
                isFetching: false,
                error: '',
                connectionIds: action.connectionIds,
                newConnectionsAvailable: false
            })
        case actions.REMOVING_CONNECTION_LIST_LISTENER_SUCCESS:
            return state.merge({
                isFetching: false,
                error: ''
            })
        case actions.ADD_NEW_CONNECTION_ID_TO_CONNECTION_LIST:
            return state.merge({
                newConnectionsToAdd: state.get('newConnectionsToAdd').unshift(action.connectionId)
            })
        case actions.RESET_NEW_CONNECTIONS_AVAILABLE:
            return state.merge({
                connectionIds: state.get('newConnectionsToAdd').concat(state.get('connectionIds')),
                newConnectionsToAdd: [],
                newConnectionsAvailable: false
            })
        default:
            return state
    }
}
