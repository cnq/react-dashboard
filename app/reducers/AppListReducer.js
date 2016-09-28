import { applist as actions } from 'actions'

const initialState = {
    isFetching: false,
    error: '',
    apps: []
}

export default function applist ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.APPLIST_INITILIZE:
        case actions.APPLIST_FETCH_START:
        case actions.APPLIST_FETCH_REQUEST:
            return {
                ... state
            }
        case actions.APPLIST_FETCH_SUCCESS:
            return {
                ... state,
        isFetching: false,
        error: action.error,
        apps: action.apps
        }
        case actions.APPLIST_FETCH_FAIL:
            return {
                ... state,
            isFetching: false,
            error: action.error
        }
        case actions.APPLIST_APP_CREATE_START:
        return {
            ... state,
            isFetching: false,
            error: '',
            apps: state.apps.concat({appId: "newapp", backendSiteUri: action.backendSiteUri, isCreating: true, connections: [], uri:"" })
        }
        case actions.APPLIST_APP_CREATE_SUCCESS:
        return {
            ... state,
            isFetching: false,
            error: '',
            apps: state.apps.map(function(app) { return app.appId == "newapp" ? action.app : app; })
        }
        case actions.APPLIST_APP_CREATE_FAIL:
        return {
            ... state,
            isFetching: false,
            error: '',
            apps: state.apps.filter(function(app) { return app.appId != "newapp"; })
        }


        case actions.APPLIST_APP_DELETE_START:
            return state;
        case actions.APPLIST_APP_DELETE_SUCCESS:
        return {
            ... state,
            isFetching: false,
            error: '',
            apps: state.apps.filter(function(app) { return app.appId != action.app.appId; })
        }
        case actions.APPLIST_APP_DELETE_FAIL:
            return state
        default:
            return state
    }
}