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
    isAuthenticated: false,
    authenticatedId: ''
}

export default function users ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.AUTH_USER:
            return {
                ...state,
                isAuthenticated: true,
                authenticatedId: action.uid
            }
        case actions.UNAUTH_USER:
            return {
                ...state,
                isAuthenticated: false,
                authenticatedId: ''
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
                    error: '',
                    isFetching: false
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
