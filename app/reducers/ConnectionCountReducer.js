//TODO: Integrate this to track connection counts in state
import {
    connectionCount as connectionCountActions,
    connetions  as connectionsActions
} from 'actions'
import { Map, fromJS } from 'immutable'

function count ( state = 0, action ) {
    switch ( action.type ) {
        case connectionsActions.ADD_CONNECTION:
            return state + 1
        case connectionsActions.REMOVE_CONNECTION:
            return state - 1
        default:
            return state
    }
}
const initialState = Map({
    isFetching: false,
    error: ''
})

export default function connectionCount ( state = initialState, action ) {
    switch ( action.type ) {
        case connectionCountActions.FETCHING_CONNECTION_COUNT:
            return state.merge({
                isFetching: true
            })
        case connectionCountActions.FETCHING_CONNECTION_COUNT_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })
        case connectionCountActions.FETCHING_CONNECTION_COUNT_SUCCESS:
            return state.merge({
                isFetching: false,
                error: '',
                [action.appId]: action.count
            })
        case connectionsActions.ADD_CONNECTION:
        case connectionsActions.REMOVE_CONNECTION:
            return typeof state[action.appId] === 'undefined'
                ?   state
                :   state.merge({
                        [action.appId]: count(state[action.appId], action)
                    })
        default:
            return state
    }
}