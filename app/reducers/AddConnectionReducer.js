import { addConnection as actions } from 'actions'

const initialState = {
    connectionUri: '',
    connectionType: '',
    connectionName: '',
    isActive: true
}

export default function addConnection ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.ACTIVATE_ADD_CONNECTION:
            return {
                ...state,
                isActive: true
            }
        case actions.DEACTIVATE_ADD_CONNECTION:
            return {
                ...state,
                isActive: false
            }
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
        default:
            return state
    }
}
