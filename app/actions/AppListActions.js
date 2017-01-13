
export const APPLIST_INITILIZE = 'APPLIST_INITILIZE'
export const APPLIST_FETCH_START = 'APPLIST_FETCH_START'
export const APPLIST_FETCH_START_CONSTANT = 'APPLIST_FETCH_START_CONSTANT'
export const APPLIST_FETCH_STOP_CONSTANT = 'APPLIST_FETCH_STOP_CONSTANT'
export const APPLIST_FETCH_REQUEST = 'APPLIST_FETCH_REQUEST'
export const APPLIST_FETCH_SUCCESS = 'APPLIST_FETCH_SUCCESS'
export const APPLIST_FETCH_FAIL = 'APPLIST_FETCH_FAIL'

export const appListInitialize = () => ({ type: APPLIST_INITILIZE })
export const appListFetchStart = () => ({ type: APPLIST_FETCH_START })
export const appListFetchStartConstant = () => ({ type: APPLIST_FETCH_START_CONSTANT })
export const appListFetchStopConstant = () => ({ type: APPLIST_FETCH_STOP_CONSTANT })
export const appListFetchRequest = () => ({ type: APPLIST_FETCH_REQUEST })
export const appListFetchSuccess = (apps) => ({ type: APPLIST_FETCH_SUCCESS, apps: apps })
export const appListFetchFail = (errorMessage) => ({ type: APPLIST_FETCH_FAIL, error: errorMessage })