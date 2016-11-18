
export const USERLIST_INITILIZE = 'USERLIST_INITILIZE'
export const USERLIST_FETCH_START = 'USERLIST_FETCH_START'
export const USERLIST_FETCH_REQUEST = 'USERLIST_FETCH_REQUEST'
export const USERLIST_FETCH_SUCCESS = 'USERLIST_FETCH_SUCCESS'
export const USERLIST_FETCH_FAIL = 'USERLIST_FETCH_FAIL'

export const userListInitialize = () => ({ type: USERLIST_INITILIZE })
export const userListFetchStart = () => ({ type: USERLIST_FETCH_START })
export const userListFetchRequest = () => ({ type: USERLIST_FETCH_REQUEST })
export const userListFetchSuccess = (users) => ({ type: USERLIST_FETCH_SUCCESS, users: users })
export const userListFetchFail = (errorMessage) => ({ type: USERLIST_FETCH_FAIL, error: errorMessage })