


export const SIGN_IN_INITIATED = 'SIGN_IN_INITIATED'
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_REQUEST_COMPLETE = 'SIGN_IN_REQUEST_COMPLETE'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL'
export const SIGN_IN_COMPLETE = 'SIGN_IN_COMPLETE'


export const signIn = (authenticationCredentials) => (
    {
        type: SIGN_IN_INITIATED,
        isAuthenticated : false,
        email : authenticationCredentials.email,
        password: authenticationCredentials.password
    })
