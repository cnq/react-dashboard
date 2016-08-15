import { appList as actions } from 'actions'
import { List, fromJS } from 'immutable'

const initialState = fromJS({
    isFetching: false,
    error: '',
    newAppsAvailable: false,
    newAppsToAdd: [],
    appIds: []
})

export default function appList ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.SETTING_APP_LIST_LISTENER:
            return state.merge({
                isFetching: true
            })
        case actions.SETTING_APP_LIST_LISTENER_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })
        case actions.SETTING_APP_LIST_LISTENER_SUCCESS:
            return state.merge({
                isFetching: false,
                error: '',
                appIds: action.appIds,
                newAppsAvailable: false
            })
        case actions.ADD_NEW_APP_ID_TO_APP_LIST:
            return state.merge({
                newAppsToAdd: state.get('newAppsToAdd').unshift(action.appId)
            })
        case actions.RESET_NEW_APPS_AVAILABLE:
            return state.merge({
                appIds: state.get('newAppsToAdd').concat(state.get('appIds')),
                newAppsToAdd: [],
                newAppsAvailable: false
            })
        default:
            return state
    }
}
