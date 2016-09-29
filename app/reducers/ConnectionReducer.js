import { connectionActions } from 'actions'
import connectionList from './ConnectionListReducer'

const addConnectionInitialState = {
    isCreating: false,
    error: '',
    backendSiteUri: ''
}

export function addConnection ( state = addConnectionInitialState, action ) {
    switch ( action.type ) {
        case connectionActions.CONNECTION_CREATE_INITILIZE:
        case connectionActions.CONNECTION_CREATE_START:
            return {
                ... state,
                backendSiteUri: action.backendSiteUri,
                isCreating: true
            }
        case connectionActions.CONNECTION_CREATE_REQUEST:
            return {
                ... state,
                backendSiteUri: action.backendSiteUri,
                isCreating: true
            }
        case connectionActions.CONNECTION_CREATE_SUCCESS:
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
        isDeleting: false,
        error: '',
        connection: null
    }

export function deleteConnection ( state = deleteConnectionInitialState, action ) {
    switch ( action.type ) {
        case connectionActions.CONNECTION_DELETE_INITILIZE:
        case connectionActions.CONNECTION_DELETE_START:
            return {
                ... state,
                connection: action.connection,
                isDeleting: true
            }
        case connectionActions.CONNECTION_DELETE_REQUEST:
            return {
                ... state,
                connection: action.connection,
                isDeleting: true
            }
        case connectionActions.CONNECTION_DELETE_SUCCESS:
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