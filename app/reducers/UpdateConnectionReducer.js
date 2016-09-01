import { updateConnection as actions } from 'actions'

const initialState = {
    connectionUri: '',
    connectionType: '',
    connectionName: '',
    isActive: true,
    isEditingConnectionUri: false,
    isEditingConnectionType: false,
    isEditingConnectionName: false
}

export default function updateConnection ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.UPDATE_CONNECTION_URI:
            return {
                ...state,
                connectionUri: action.newConnectionUri
            }
        case actions.UPDATE_CONNECTION_TYPE:
            return {
                ...state,
                connectionType: action.newConnectionType
            }
        case actions.UPDATE_CONNECTION_NAME:
            return {
                ...state,
                connectionName: action.newConnectionName
            }
        case actions.EDITING_CONNECTION_URI:
            return {
                ...state,
                isEditingConnectionUri: true
            }
        case actions.EDITING_CONNECTION_TYPE:
            return {
                ...state,
                isEditingConnectionType: true
            }
        case actions.EDITING_CONNECTION_NAME:
            return {
                ...state,
                isEditingConnectionName: true
            }
        case actions.EDITING_CONNECTION_URI_COMPLETE:
            return {
                ...state,
                isEditingConnectionUri: false
            }
        case actions.EDITING_CONNECTION_TYPE_COMPLETE:
            return {
                ...state,
                isEditingConnectionType: false
            }
        case actions.EDITING_CONNECTION_NAME_COMPLETE:
            return {
                ...state,
                isEditingConnectionName: false
            }
        default:
            return state
    }
}
