import { userlist as actions } from 'actions'
import { userActions } from 'actions'
import { connectionActions } from 'actions'

const initialState = {
    initialFetchComplete: false,
    isFetching: false,
    error: '',
    users: []
}

export default function userlist ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.USERLIST_INITILIZE:
            return {
                ... state,
                isFetching: true
            }
        case actions.USERLIST_FETCH_START:
            return {
                ... state
            }
        case actions.USERLIST_FETCH_REQUEST:
            return {
                ... state
            }
        case actions.USERLIST_FETCH_SUCCESS:
            return {
                ... state,
                isFetching: false,
                initialFetchComplete: true,
                error: '',
                users: action.users
        }
        case actions.USERLIST_FETCH_FAIL:
            return {
                ... state,
                isFetching: false,
                initialFetchComplete: true,
                error: action.error
        }
        case userActions.USER_CREATE_START:
            return {
                ... state,
                users: state.users.concat({userId: "newuser" }),
                error: ''
            }
        case userActions.USER_CREATE_SUCCESS:
            return {
                ... state,
                users: state.users.map(function(user) { return user.userId == "newuser" ? action.user : user; }),
                error: ''
            }
        case userActions.USER_CREATE_FAIL:
            return {
                ... state,
                error: action.error,
                users: state.users.filter(function(user) { return user.userId != "newuser"; })
            }

        case userActions.USER_DELETE_START:
            return {
                ... state,
                users: state.users.map(function(user) { 
                    if( user.userId == action.user.userId ){
                        user.isDeleting = true; 
                    }
                    return user;
                }),
                error: ''
            }
        case userActions.USER_DELETE_SUCCESS:
            return {
                ... state,
                users: state.users.filter(function(user) { return user.userId != action.user.userId; }),
                error: ''
            }
        case userActions.USER_DELETE_FAIL:
            return {
                ... state,
                users: state.users.filter(function(user) { return user.userId != action.user.userId; }),
                error: action.error
            }
        default:
            return state
    }
}