export const SIGNOUT_START = 'SIGNOUT_START'
export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST'
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'
export const SIGNOUT_FAIL = 'SIGNOUT_FAIL'

export const signoutStart = () => ({ type: SIGNOUT_START })
export const signoutRequest = () => ({ type: SIGNOUT_REQUEST })
export const signoutSuccess = () => ({ type: SIGNOUT_SUCCESS })
export const signoutFail = () => ({ type: SIGNOUT_FAIL })