
export const APPLIST_INITILIZE = 'APPLIST_INITILIZE'
export const APPLIST_FETCH_START = 'APPLIST_FETCH_START'
export const APPLIST_FETCH_REQUEST = 'APPLIST_FETCH_REQUEST'
export const APPLIST_FETCH_SUCCESS = 'APPLIST_FETCH_SUCCESS'
export const APPLIST_FETCH_FAIL = 'APPLIST_FETCH_FAIL'

export const appListInitialize = () => ({ type: APPLIST_INITILIZE })
export const appListFetchStart = () => ({ type: APPLIST_FETCH_START })
export const appListFetchRequest = () => ({ type: APPLIST_FETCH_REQUEST })
export const appListFetchSuccess = (apps) => ({ type: APPLIST_FETCH_SUCCESS, apps: apps })
export const appListFetchFail = (errorMessage) => ({ type: APPLIST_FETCH_FAIL, error: errorMessage })


export const APPLIST_REFRESH_START_CONSTANT = 'APPLIST_REFRESH_START_CONSTANT'
export const APPLIST_REFRESH_STOP_CONSTANT = 'APPLIST_REFRESH_STOP_CONSTANT'
export const APPLIST_REFRESH_REQUEST = 'APPLIST_REFRESH_REQUEST'
export const APPLIST_REFRESH_SUCCESS = 'APPLIST_REFRESH_SUCCESS'
export const APPLIST_REFRESH_FAIL = 'APPLIST_REFRESH_FAIL'

export const appListRefreshStartConstant = () => ({ type: APPLIST_REFRESH_START_CONSTANT })
export const appListRefreshStopConstant = () => ({ type: APPLIST_REFRESH_STOP_CONSTANT })
export const appListRefreshRequest = () => ({ type: APPLIST_REFRESH_REQUEST })
export const appListRefreshSuccess = (apps) => ({ type: APPLIST_REFRESH_SUCCESS, apps: apps })
export const appListRefreshFail = (errorMessage) => ({ type: APPLIST_REFRESH_FAIL, error: errorMessage })