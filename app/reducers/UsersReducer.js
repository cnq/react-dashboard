import { users as actions } from 'actions'

const initialUserState = {
    lastUpdate: 0,
    info: {
        name: '',
        uid: '',
        avatar: ''
    }
}

function user ( state = initialUserState, action ) {
    switch ( action.type ) {
        case actions.FETCHING_USER_SUCCESS:
            return {
                ...state,
                info: action.user,
                lastUpdated: action.timestamp
            }
        default:
            return state
    }
}

    // Users Reducer
    const initialState = {
        isFetching: false,
        error: '',
        isAuthenticating: false,
        isAuthenticated: false,
        authenticatedId: ''
    }

export default function users ( state = initialState, action ) {
    console.log(action.type);
    switch ( action.type ) {
        case actions.AUTH_USER:
            return {
                ...state,
                isAuthenticated: true,
                isAuthenticating: false,
                authenticatedId: action.uid
            }
        case actions.UNAUTH_USER:
            return {
                ...state,
                isAuthenticated: false,
                authenticatedId: ''
            }
        case actions.AUTHENTICATING_USER:
            return {
                ...state,
                isAuthenticating: true
            }
        case actions.FETCHING_USER:
            return {
                ...state,
                isFetching: true
            }
        case actions.FETCHING_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case actions.FETCHING_USER_SUCCESS:
            return (
                action.user === null
                    ?   {
                            ...state,
                        isFetching: false,
                        error: ''
                    }
                    :   {
                            ...state,
                        isFetching: false,
                        error: '',
                            [action.uid]: user( state[action.uid], action )
                    }
            )
        default:
            return state
    }
}
