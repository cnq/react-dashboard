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
    failed: false
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
                failed: true
            }
        default:
            return state
      }
}

const setupUserInitialState = {
    user: null,
    isSettingUp: false,
    isSetupComplete: false,
    failed: false
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
                failed: true
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

const userChangePasswordInitialState = {
    user: null,
    isInProgress: false,
    isCompleteSuccessfully: false,
    error: ''
}

export function userChangePassword ( state = userChangePasswordInitialState, action ) {
    switch ( action.type ) {
        case userActions.USER_CHANGEPASSWORD_INITILIZE:
            return {
                ... state,
                user: action.details.user,
                isInProgress: true,
                isCompleteSuccessfully: false
            }
        case userActions.USER_CHANGEPASSWORD_START:
            return {
                ... state
            }
        case userActions.USER_CHANGEPASSWORD_REQUEST:
            return {
                ... state
            }
        case userActions.USER_CHANGEPASSWORD_SUCCESS:
            return {
                ... state,
                user: action.user,
                isInProgress: false,
                isCompleteSuccessfully: true
            }
        case userActions.USER_CHANGEPASSWORD_FAIL:
            return {
                ... state,
                isInProgress: false,
                error: action.error
            }
        default:
            return state
            }
}

const userResetPasswordInitialState = {
    user: null,
    isInProgress: false,
    isCompleteSuccessfully: false,
    failed: false
}

export function userResetPassword ( state = userResetPasswordInitialState, action ) {
    switch ( action.type ) {
        case userActions.USER_RESETPASSWORD_INITILIZE:
            return {
                ... state,
                user: action.user,
                isInProgress: true,
                isCompleteSuccessfully: false
            }
        case userActions.USER_RESETPASSWORD_START:
            return {
                ... state
            }
        case userActions.USER_RESETPASSWORD_REQUEST:
            return {
                ... state
            }
        case userActions.USER_RESETPASSWORD_SUCCESS:
            return {
                ... state,
                user: action.user,
                isInProgress: false,
                isCompleteSuccessfully: true
            }
        case userActions.USER_RESETPASSWORD_FAIL:
            return {
                ... state,
                isInProgress: false,
                failed: true
            }
        default:
            return state
            }
}

const userChangeRolesInitialState = {
    user: null,
    isInProgress: false,
    isCompleteSuccessfully: false,
    error: ''
}

export function userChangeRoles ( state = userChangeRolesInitialState, action ) {
    switch ( action.type ) {
        case userActions.USER_CHANGEROLES_INITILIZE:
            return {
                ... state,
                user: action.user,
                isInProgress: true,
                isCompleteSuccessfully: false
            }
        case userActions.USER_CHANGEROLES_START:
            return {
                ... state
            }
        case userActions.USER_CHANGEROLES_REQUEST:
            return {
                ... state
            }
        case userActions.USER_CHANGEROLES_SUCCESS:
            return {
                ... state,
                user: action.user,
                isInProgress: false,
                isCompleteSuccessfully: true
            }
        case userActions.USER_CHANGEROLES_FAIL:
            return {
                ... state,
                isInProgress: false,
                error: action.error
            }
        default:
            return state
            }
}
