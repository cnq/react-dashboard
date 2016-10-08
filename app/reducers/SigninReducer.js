import { signin as signinActions } from 'actions'
import { signout as signoutActions } from 'actions'

const initialState = {
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    error :''
}

export default function signin ( state = initialState, action ) {
    switch ( action.type ) {
        case signoutActions.SIGNOUT_SUCCESS: 
            return {
                ...state,
                isAuthenticated: false
            }
        case signinActions.CHECK_SIGNIN_START:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                error :''
            }
        case signinActions.CHECK_SIGNIN_REQUEST:
            return {
                ...state
            }
        case signinActions.CHECK_SIGNIN_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            }
        case signinActions.CHECK_SIGNIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error
            }
        case signinActions.SIGNIN_START:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: true,
            }
        case signinActions.SIGNIN_REQUEST:
            return {
                ...state
            }
        case signinActions.SIGNIN_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true,
                isAuthenticating: false,
                user: action.user
            }
        case signinActions.SIGNIN_FAIL:
            return {
                ...state,
                isAuthenticating: false,
                error :action.error
            }
        default:
            return state
    }
}