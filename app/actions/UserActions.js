
// User Create Actions
export const USER_CREATE_INITILIZE = 'USER_CREATE_INITILIZE'
export const USER_CREATE_START = 'USER_CREATE_START'
export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST'
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS'
export const USER_CREATE_FAIL = 'USER_CREATE_FAIL'

export const userCreateInitialize = (userToAdd) => ({ type: USER_CREATE_INITILIZE, user: userToAdd })
export const userCreateStart = () => ({ type: USER_CREATE_START})
export const userCreateRequest = () => ({ type: USER_CREATE_REQUEST})
export const userCreateSuccess = (newUser) => ({ type: USER_CREATE_SUCCESS, user: newUser})
export const userCreateFail = (errorMessage) => ({ type: USER_CREATE_FAIL, error: errorMessage })

// User Activate Actions
export const USER_ACTIVATE_INITILIZE = 'USER_ACTIVATE_INITILIZE'
export const USER_ACTIVATE_START = 'USER_ACTIVATE_START'
export const USER_ACTIVATE_REQUEST = 'USER_ACTIVATE_REQUEST'
export const USER_ACTIVATE_SUCCESS = 'USER_ACTIVATE_SUCCESS'
export const USER_ACTIVATE_FAIL = 'USER_ACTIVATE_FAIL'

export const userActivateInitialize = (activationCode) => ({ type: USER_ACTIVATE_INITILIZE, code: activationCode })
export const userActivateStart = (activationCode) => ({ type: USER_ACTIVATE_START, code: activationCode})
export const userActivateRequest = (activationCode) => ({ type: USER_ACTIVATE_REQUEST, code: activationCode})
export const userActivateSuccess = (activatedUser) => ({ type: USER_ACTIVATE_SUCCESS, user: activatedUser})
export const userActivateFail = (errorMessage) => ({ type: USER_ACTIVATE_FAIL, error: errorMessage })

// User Setup Actions
export const USER_SETUP_INITILIZE = 'USER_SETUP_INITILIZE'
export const USER_SETUP_START = 'USER_SETUP_START'
export const USER_SETUP_REQUEST = 'USER_SETUP_REQUEST'
export const USER_SETUP_SUCCESS = 'USER_SETUP_SUCCESS'
export const USER_SETUP_FAIL = 'USER_SETUP_FAIL'

export const userSetupInitialize = (userSetup) => ({ type: USER_SETUP_INITILIZE, userSetup: userSetup })
export const userSetupStart = (userSetup) => ({ type: USER_SETUP_START, userSetup: userSetup})
export const userSetupRequest = (userSetup) => ({ type: USER_SETUP_REQUEST, userSetup: userSetup})
export const userSetupSuccess = (setupUser, userSetup) => ({ type: USER_SETUP_SUCCESS, user: setupUser, userSetup: userSetup})
export const userSetupFail = (errorMessage) => ({ type: USER_SETUP_FAIL, error: errorMessage })


// User Delete Actions
export const USER_DELETE_INITILIZE = 'USER_DELETE_INITILIZE'
export const USER_DELETE_START = 'USER_DELETE_START'
export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAIL = 'USER_DELETE_FAIL'

export const userDeleteInitialize = (userToDelete) => ({ type: USER_DELETE_INITILIZE, user: userToDelete})
export const userDeleteStart = (userToDelete) => ({ type: USER_DELETE_START, user: userToDelete})
export const userDeleteRequest = () => ({ type: USER_DELETE_REQUEST})
export const userDeleteSuccess = (userToDelete) => ({ type: USER_DELETE_SUCCESS, user: userToDelete})
export const userDeleteFail = (userToDelete, errorMessage) => ({ type: USER_DELETE_FAIL, user: userToDelete, error: errorMessage })

// User Change Password Actions
export const USER_CHANGEPASSWORD_INITILIZE = 'USER_CHANGEPASSWORD_INITILIZE'
export const USER_CHANGEPASSWORD_START = 'USER_CHANGEPASSWORD_START'
export const USER_CHANGEPASSWORD_REQUEST = 'USER_CHANGEPASSWORD_REQUEST'
export const USER_CHANGEPASSWORD_SUCCESS = 'USER_CHANGEPASSWORD_SUCCESS'
export const USER_CHANGEPASSWORD_FAIL = 'USER_CHANGEPASSWORD_FAIL'

export const userChangePasswordInitialize = (userChangePasswordDetails) => ({ type: USER_CHANGEPASSWORD_INITILIZE, details: userChangePasswordDetails})
export const userChangePasswordStart = (userChangePasswordDetails) => ({ type: USER_CHANGEPASSWORD_START, details: userChangePasswordDetails})
export const userChangePasswordRequest = (userChangePasswordDetails) => ({ type: USER_CHANGEPASSWORD_REQUEST, details: userChangePasswordDetails})
export const userChangePasswordSuccess = (user) => ({ type: USER_CHANGEPASSWORD_SUCCESS, user: user})
export const userChangePasswordFail = (user, errorMessage) => ({ type: USER_CHANGEPASSWORD_FAIL, user: user, error: errorMessage })

// User Password Reset Actions
export const USER_RESETPASSWORD_INITILIZE = 'USER_RESETPASSWORD_INITILIZE'
export const USER_RESETPASSWORD_START = 'USER_RESETPASSWORD_START'
export const USER_RESETPASSWORD_REQUEST = 'USER_RESETPASSWORD_REQUEST'
export const USER_RESETPASSWORD_SUCCESS = 'USER_RESETPASSWORD_SUCCESS'
export const USER_RESETPASSWORD_FAIL = 'USER_RESETPASSWORD_FAIL'

export const userResetPasswordInitialize = (userToResetPassword) => ({ type: USER_RESETPASSWORD_INITILIZE, user: userToResetPassword})
export const userResetPasswordStart = (userToResetPassword) => ({ type: USER_RESETPASSWORD_START, user: userToResetPassword})
export const userResetPasswordRequest = (userToResetPassword) => ({ type: USER_RESETPASSWORD_REQUEST, user: userToResetPassword })
export const userResetPasswordSuccess = (userToResetPassword) => ({ type: USER_RESETPASSWORD_SUCCESS, user: userToResetPassword})
export const userResetPasswordFail = (user, errorMessage) => ({ type: USER_RESETPASSWORD_FAIL, user: user, error: errorMessage })

// User Change Roles Actions
export const USER_CHANGEROLES_INITILIZE = 'USER_CHANGEROLES_INITILIZE'
export const USER_CHANGEROLES_START = 'USER_CHANGEROLES_START'
export const USER_CHANGEROLES_REQUEST = 'USER_CHANGEROLES_REQUEST'
export const USER_CHANGEROLES_SUCCESS = 'USER_CHANGEROLES_SUCCESS'
export const USER_CHANGEROLES_FAIL = 'USER_CHANGEROLES_FAIL'

export const userChangeRolesInitialize = (userToChangeRoles) => ({ type: USER_CHANGEROLES_INITILIZE, user: userToChangeRoles})
export const userChangeRolesStart = (userToChangeRoles) => ({ type: USER_CHANGEROLES_START, user: userToChangeRoles})
export const userChangeRolesRequest = (userToChangeRoles) => ({ type: USER_CHANGEROLES_REQUEST, user: userToChangeRoles })
export const userChangeRolesSuccess = (userToChangeRoles) => ({ type: USER_CHANGEROLES_SUCCESS, user: userToChangeRoles})
export const userChangeRolesFail = (user, errorMessage) => ({ type: USER_CHANGEROLES_FAIL, user: user, error: errorMessage })