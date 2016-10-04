import { signout as actions } from 'actions'

const initialState = {
    isSignoutComplete: false,
    isSigningOut: false,
    error :''
}

export default function signout ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.SIGN_OUT_START:
            return {
                ...state,
                isSignoutComplete: false,
                isSigningOut: true,
                error :''
            }
        case actions.SIGN_OUT_REQUEST:
            return {
                ...state,
                isSignoutComplete: false,
                isSigningOut: true,
                error :''
            }
        case actions.SIGN_OUT_SUCCESS: 
            return {
                ...state,
                isSignoutComplete: true,
                isSigningOut: false,
                error :''
            }
        case actions.SIGN_OUT_FAIL:
            return {
                ...state,
                isSignoutComplete: true,
                isSigningOut: false,
                error : action.error
            }

        default:
            return state
    }
}