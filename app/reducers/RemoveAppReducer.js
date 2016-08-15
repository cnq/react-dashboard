import { removeApp as actions } from 'actions'
import { Map, fromJS } from 'immutable'

const initialState = fromJS({
    appId: '',
    error: ''
})

export default function removeApp ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.REMOVING_APP:
            return state.merge({
                appId: action.appId,
                error: ''
            })
        case actions.REMOVE_APP_ERROR:
            return state.merge({
                appId: action.appId,
                error: action.error
            })
        case actions.REMOVE_APP_SUCCESS:
            return state.merge({
                appId: action.appId,
                error: ''
            })
        case actions.REMOVE_APP_COMPLETE:
            return state.merge({
                appId: action.appId,
                error: ''
            })
        default:
            return state
    }
}
