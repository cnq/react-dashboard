import { appsConnections as actions } from 'actions'

function appsConnections ( state = initialAppsConnectionState, action ) {
    switch ( action.type ) {
        case actions.ADD_SINGLE_APPS_CONNECTION:
            return {
                ...state,
                connectionIds: state.connectionIds.concat([action.connectionId])
            }
        default:
            return state
    }
}

const initialState = {
    isFetching: true,
    error: ''
}

export default function appsConnections ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.FETCHING_APPS_CONNECTIONS:
            return {
                ...state,
                isFetching: true
            }
        case actions.FETCHING_APPS_CONNECTIONS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case actions.FETCHING_APPS_CONNECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: '',
                [action.appId]: {
                    lastUpdated: action.lastUpdated,
                    connectionIds: action.connectionIds
                }
            }
        case actions.ADD_SINGLE_APPS_CONNECTION:
            return (
                typeof state[action.appId] === 'undefined'
                    ?   state
                    :   {
                            ...state,
                            isFetching: false,
                            error: '',
                            [action.appId]: appsConnection(state[action.appId], action)
                        }
            )
        default:
            return state
    }
}
