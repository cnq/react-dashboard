import { usersApps as actions } from 'actions'

function usersApp ( state = initialUsersAppState, action ) {

    switch ( action.type ) {

        case actions.ADD_SINGLE_USERS_APP:
            return {
                ...state,
                appIds: state.appIds.concat([action.appId])
            };

        default:
            return state

    }

}

const initialState = {
    isFetching: true,
    error: ''
};

export default function usersApps ( state = initialState, action ) {

    switch ( action.type ) {

        case actions.FETCHING_USERS_APPS:
            return {
                ...state,
                isFetching: true
            };

        case actions.FETCHING_USERS_APPS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };

        case actions.FETCHING_USERS_APPS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: '',
                [action.uid]: {
                    lastUpdated: action.lastUpdated,
                    appIds: action.appIds
                }
            };

        case actions.ADD_SINGLE_USERS_APP:
            return (
                typeof state[action.uid] === 'undefined'
                    ?   state
                    :   {
                            ...state,
                            isFetching: false,
                            error: '',
                            [action.uid]: usersApp(state[action.uid], action)
                        }
            );

        default:
            return state

    }

}