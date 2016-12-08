import { userActions } from 'actions'

const addUserInitialState = {
    user: null,
    isCreating: false,
    error: ''
}

export function addUser ( state = addUserInitialState, action ) {
    switch ( action.type ) {
        case userActions.USER_CREATE_INITILIZE:
            return {
                ... state,
                user: action.user,
                isCreating: true
            }
        case userActions.USER_CREATE_START:
            return {
                ... state
            }
        case userActions.USER_CREATE_REQUEST:
            return {
                ... state
            }
        case userActions.USER_CREATE_SUCCESS:
            return {
                ... state,
                isCreating: false
            }
        case userActions.USER_CREATE_FAIL:
            return {
                ... state,
                isCreating: false,
                error: action.error
            }
        default:
            return state
    }
}

const activateUserInitialState = {
    user: null,
    isActivating: false,
    isActivated: false,
    error: ''
}

export function activateUser ( state = activateUserInitialState, action ) {
    switch ( action.type ) {
        case userActions.USER_ACTIVATE_INITILIZE:
            return {
                ... state,
                isActivating: true
            }
        case userActions.USER_ACTIVATE_START:
            return {
                ... state
            }
        case userActions.USER_ACTIVATE_REQUEST:
            return {
                ... state
            }
        case userActions.USER_ACTIVATE_SUCCESS:
            return {
                ... state,
                user: action.user,
                isActivating: false,
                isActivated: true
            }
        case userActions.USER_ACTIVATE_FAIL:
            return {
                ... state,
                isActivating: false,
                error: action.error
            }
        default:
            return state
      }
}

const setupUserInitialState = {
    user: null,
    isSettingUp: false,
    isSetupComplete: false,
    error: ''
}

export function setupUser ( state = setupUserInitialState, action ) {
    switch ( action.type ) {
        case userActions.USER_SETUP_INITILIZE:
            return {
                ... state,
                isSettingUp: true
            }
        case userActions.USER_SETUP_START:
            return {
                ... state
            }
        case userActions.USER_SETUP_REQUEST:
            return {
                ... state
            }
        case userActions.USER_SETUP_SUCCESS:
            return {
                ... state,
                user: action.user,
                isSettingUp: false,
                isSetupComplete: true
            }
        case userActions.USER_SETUP_FAIL:
            return {
                ... state,
                isSettingUp: false,
                error: action.error
            }
        default:
            return state
     }
}


const deleteUserInitialState = {
        user: null,
        isDeleting: false,
        error: ''
    }

export function deleteUser ( state = deleteUserInitialState, action ) {
    switch ( action.type ) {
        case userActions.USER_DELETE_INITILIZE:
            return {
                ... state,
                user: action.user,
                isDeleting: true
            }
        case userActions.USER_DELETE_START:
            return {
                ... state
            }
        case userActions.USER_DELETE_REQUEST:
            return {
                ... state
            }
        case userActions.USER_DELETE_SUCCESS:
            return {
                ... state,
                user: action.user,
                isDeleting: false,
            }
        case userActions.USER_DELETE_FAIL:
            return {
                ... state,
                isDeleting: false,
                error: action.error
            }
        default:
            return state
    }
}