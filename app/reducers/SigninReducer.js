import { signin as actions } from 'actions'

const initialState = {
    isAuthenticated: false,
    email :'',
    password: ''
}

export default function signin ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.SIGN_IN_INITIATED:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                email :action.email,
                password: action.password
            }
        case actions.SIGN_IN_REQUEST:
            return state
        default:
            return state
    }
}