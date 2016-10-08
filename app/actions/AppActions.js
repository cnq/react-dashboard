
// App Create Actions
export const APP_CREATE_INITILIZE = 'APP_CREATE_INITILIZE'
export const APP_CREATE_START = 'APP_CREATE_START'
export const APP_CREATE_REQUEST = 'APP_CREATE_REQUEST'
export const APP_CREATE_SUCCESS = 'APP_CREATE_SUCCESS'
export const APP_CREATE_FAIL = 'APP_CREATE_FAIL'

export const appCreateInitialize = (backendSiteUri) => ({ type: APP_CREATE_INITILIZE, backendSiteUri: backendSiteUri })
export const appCreateStart = () => ({ type: APP_CREATE_START})
export const appCreateRequest = () => ({ type: APP_CREATE_REQUEST})
export const appCreateSuccess = (newApp) => ({ type: APP_CREATE_SUCCESS, app: newApp})
export const appCreateFail = (errorMessage) => ({ type: APP_CREATE_FAIL, error: errorMessage })


// App Delete Actions
export const APP_DELETE_INITILIZE = 'APP_DELETE_INITILIZE'
export const APP_DELETE_START = 'APP_DELETE_START'
export const APP_DELETE_REQUEST = 'APP_DELETE_REQUEST'
export const APP_DELETE_SUCCESS = 'APP_DELETE_SUCCESS'
export const APP_DELETE_FAIL = 'APP_DELETE_FAIL'

export const appDeleteInitialize = (appToDelete) => ({ type: APP_DELETE_INITILIZE, app: appToDelete})
export const appDeleteStart = (appToDelete) => ({ type: APP_DELETE_START, app: appToDelete})
export const appDeleteRequest = () => ({ type: APP_DELETE_REQUEST})
export const appDeleteSuccess = (appToDelete) => ({ type: APP_DELETE_SUCCESS, app: appToDelete})
export const appDeleteFail = (appToDelete, errorMessage) => ({ type: APP_DELETE_FAIL, app: appToDelete, error: errorMessage })

