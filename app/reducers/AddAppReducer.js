import { addApp as actions } from 'actions'

const initialState = {
    backendSiteUri: '',
    uri: '',
    isActive: false
}

export default function addApp ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.ACTIVATE_ADD_APP:
            return {
                ...state,
                isActive: true
            }
        case actions.DEACTIVATE_ADD_APP:
            return {
                ...state,
                isActive: false
            }
        case actions.UPDATE_BACKEND_SITE_URI:
            return {
                ...state,
                backendSiteUri: action.newBackendSiteUri
            }
        case actions.UPDATE_URI:
            return {
                ...state,
                uri: action.newUri
            }
        default:
            return state
    }
}
