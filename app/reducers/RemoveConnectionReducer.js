import { removeConnection as actions } from 'actions'
import { Map, fromJS } from 'immutable'

const initialState = fromJS({
    connectionId: '',
    error: ''
})

export default function removeConnection ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.REMOVING_CONNECTION:
            return state.merge({
                connectionId: action.connectionId,
                error: ''
            })
        case actions.REMOVE_CONNECTION_ERROR:
            return state.merge({
                connectionId: action.connectionId,
                error: action.error
            })
        case actions.REMOVE_CONNECTION_SUCCESS:
            return state.merge({
                connectionId: action.connectionId,
                error: ''
            })
        case actions.REMOVE_CONNECTION_COMPLETE:
            return state.merge({
                connectionId: action.connectionId,
                error: ''
            })
        default:
            return state
    }
}
