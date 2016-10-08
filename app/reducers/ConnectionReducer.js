import { connectionActions } from 'actions'

const addConnectionInitialState = {
    connection: null,
    isCreating: false,
    error: ''
}

export function addConnection ( state = addConnectionInitialState, action ) {
    switch ( action.type ) {
        case connectionActions.CONNECTION_CREATE_INITILIZE:
            return {
                ... state,
                connection: action.connection,
                isCreating: true
            }
        case connectionActions.CONNECTION_CREATE_START:
            return {
                ... state
            }
        case connectionActions.CONNECTION_CREATE_REQUEST:
            return {
                ... state
            }
        case connectionActions.CONNECTION_CREATE_SUCCESS:
            return {
                ... state,
                isCreating: false
            }
        case connectionActions.CONNECTION_CREATE_FAIL:
            return {
                ... state,
                isCreating: false,
                error: action.error
            }
        default:
            return state
    }
}


const deleteConnectionInitialState = {
        connection: null,
        isDeleting: false,
        error: ''
    }

export function deleteConnection ( state = deleteConnectionInitialState, action ) {
    switch ( action.type ) {
        case connectionActions.CONNECTION_DELETE_INITILIZE:
            return {
                ... state,
                connection: action.connection,
                isDeleting: true
            }
        case connectionActions.CONNECTION_DELETE_START:
            return {
                ... state
            }
        case connectionActions.CONNECTION_DELETE_REQUEST:
            return {
                ... state
            }
        case connectionActions.CONNECTION_DELETE_SUCCESS:
            return {
                ... state,
                connection: action.connection,
                isDeleting: false,
            }
        case connectionActions.CONNECTION_DELETE_FAIL:
            return {
                ... state,
                isDeleting: false,
                error: action.error
            }
        default:
            return state
    }
}