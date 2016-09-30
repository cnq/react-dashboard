import { connectionList as actions } from 'actions'

const initialState = {
    isFetching: false,
    error: '',
    appId: '',
    connections: []
}

export default function connectionList ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.CONNECTIONLIST_INITILIZE:
        case actions.CONNECTIONLIST_FETCH_START:
        case actions.CONNECTIONLIST_FETCH_REQUEST:
            return {
                ... state
            }
        case actions.CONNECTIONLIST_FETCH_SUCCESS:
            return {
                ... state,
        isFetching: false,
        error: action.error,
        connections: action.connections
        }
        case actions.CONNECTIONLIST_FETCH_FAIL:
            return {
                ... state,
            isFetching: false,
            error: action.error
        }
        case actions.CONNECTIONLIST_CONNECTION_CREATE_START:
        return {
            ... state,
            isFetching: false,
            error: '',
            connections: state.connections.concat({connectionId: "newconnection", backendSiteUri: action.backendSiteUri, isCreating: true, connections: [], uri:"" })
        }
        case actions.CONNECTIONLIST_CONNECTION_CREATE_SUCCESS:
        return {
            ... state,
            isFetching: false,
            error: '',
            connections: state.connections.map(function(connection) { return connection.connectionId == "newconnection" ? action.connection : connection; })
        }
        case actions.CONNECTIONLIST_CONNECTION_CREATE_FAIL:
        return {
            ... state,
            isFetching: false,
            error: '',
            connections: state.connections.filter(function(connection) { return connection.connectionId != "newconnection"; })
        }


        case actions.CONNECTIONLIST_CONNECTION_DELETE_START:
            return state;
        case actions.CONNECTIONLIST_CONNECTION_DELETE_SUCCESS:
        return {
            ... state,
            isFetching: false,
            error: '',
            connections: state.connections.filter(function(connection) { return connection.connectionId != action.connection.connectionId; })
        }
        case actions.CONNECTIONLIST_CONNECTION_DELETE_FAIL:
            return state
        default:
            return state
    }
}