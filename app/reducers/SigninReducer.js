import { signin as actions } from 'actions'

const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    error :'',
    email :'',
    password: ''
}

export default function signin ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.SIGN_IN_CLEAR:
            return {
                ...state,
                isAuthenticated: false
            }
        case actions.CHECK_SIGN_IN_START:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        case actions.CHECK_SIGN_IN_REQUEST:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        case actions.CHECK_SIGN_IN_SUCCESS: 
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        case actions.CHECK_SIGN_IN_FAIL:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        case actions.CHECK_SIGN_IN_INITILIZE:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                isAuthenticating: action.isAuthenticating,
                error :action.error,
                email :action.email,
                password: action.password
            }
        case actions.SIGN_IN_START:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                isAuthenticating: action.isAuthenticating,
                error :action.error,
                email :action.email,
                password: action.password
            }
        case actions.SIGN_IN_REQUEST:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                isAuthenticating: action.isAuthenticating,
                error :action.error,
                email :action.email,
                password: action.password
            }
        case actions.SIGN_IN_SUCCESS: 
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                isAuthenticating: action.isAuthenticating,
                error :action.error,
                email :action.email,
                password: action.password
            }
        case actions.SIGN_IN_FAIL:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                isAuthenticating: action.isAuthenticating,
                error :action.error,
                email :action.email,
                password: action.password
            }

        default:
            return state
    }
}