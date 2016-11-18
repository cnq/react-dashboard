
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

