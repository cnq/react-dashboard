import { feed as actions } from 'actions'
import { List, fromJS } from 'immutable'

const initialState = fromJS({
    isFetching: false,
    error: '',
    newAppsAvailable: false,
    newAppsToAdd: [],
    appIds: []
})

export default function feed ( state = initialState, action ) {

    switch ( action.type ) {

        case actions.SETTING_FEED_LISTENER:
            return state.merge({
                isFetching: true
            })

        case actions.SETTING_FEED_LISTENER_ERROR:
            return state.merge({
                isFetching: false,
                error: action.error
            })

        case actions.SETTING_FEED_LISTENER_SUCCESS:
            return state.merge({
                isFetching: false,
                error: '',
                appIds: action.appIds,
                newAppsAvailable: false
            })

        case actions.ADD_NEW_APP_ID_TO_FEED:
            return state.merge({
                /* with immutable, the following vanilla JS changes.
                unshift prepends to the front of the object.

                vanilla JS ->    newAppsToAdd: [ action.appId, ...state.newAppsToAdd ]
                immutable JS ->  newAppsToAdd: state.get('newAppsToAdd').unshift(action.appId)
                */
                newAppsToAdd: state.get('newAppsToAdd').unshift(action.appId)
            })

        case actions.RESET_NEW_APPS_AVAILABLE:
            return state.merge({
                /* with immutable, the following vanilla JS changes.

                 vanilla JS ->    appIds: [ ...state.newAppsToAdd, ...state.appIds ],
                 immutable JS ->  appIds: state.get('newAppsToAdd').concat(state.get('appIds')),
                 */
                appIds: state.get('newAppsToAdd').concat(state.get('appIds')),
                newAppsToAdd: [],
                newAppsAvailable: false
            })

        default:
            return state

    }

}