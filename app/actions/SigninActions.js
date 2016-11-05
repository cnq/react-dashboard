
export const SIGNIN_INITILIZE = 'SIGNIN_INITILIZE'
export const SIGNIN_START = 'SIGNIN_START'
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAIL = 'SIGNIN_FAIL'

export const signinInitialize = () => ({ type: SIGNIN_INITILIZE, isAuthenticated : false, isAuthenticating : false, error : '' })
export const signinStart = (authenticationCredentials) => ( { type: SIGNIN_START, authenticationCredentials : authenticationCredentials })
export const signinRequest = (authenticationCredentials) => ( { type: SIGNIN_REQUEST, authenticationCredentials : authenticationCredentials })
export const signinSuccess = (signedInUser) => ( { type: SIGNIN_SUCCESS, user: signedInUser })
export const signinFail = (errorMessage) => ( { type: SIGNIN_FAIL, error: errorMessage })


export const CHECK_SIGNIN_START = 'CHECK_SIGNIN_START'
export const CHECK_SIGNIN_REQUEST = 'CHECK_SIGNIN_REQUEST'
export const CHECK_SIGNIN_SUCCESS = 'CHECK_SIGNIN_SUCCESS'
export const CHECK_SIGNIN_FAIL = 'CHECK_SIGNIN_FAIL'

export const checkSigninStart = () => ( { type: CHECK_SIGNIN_START })
export const checkSigninRequest = () => ( { type: CHECK_SIGNIN_REQUEST })
export const checkSigninSuccess = (signedInUser) => ( { type: CHECK_SIGNIN_SUCCESS, user: signedInUser })
export const checkSigninFail = (errorMessage) => ( { type: CHECK_SIGNIN_FAIL, error: errorMessage })


