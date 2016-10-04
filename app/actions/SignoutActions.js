export const SIGN_OUT_INITILIZE = 'SIGN_OUT_INITILIZE'
export const SIGN_OUT_START = 'SIGN_OUT_START'
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAIL = 'SIGN_OUT_FAIL'


export const signout = (authenticationCredentials) => (
    {
        type: SIGN_OUT_START
    })