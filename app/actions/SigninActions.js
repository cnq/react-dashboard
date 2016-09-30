
export const SIGN_IN_INITILIZE = 'SIGN_IN_INITILIZE'
export const SIGN_IN_START = 'SIGN_IN_START'
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL'

export const CHECK_SIGN_IN_START = 'CHECK_SIGN_IN_START'
export const CHECK_SIGN_IN_REQUEST = 'CHECK_SIGN_IN_REQUEST'
export const CHECK_SIGN_IN_SUCCESS = 'CHECK_SIGN_IN_SUCCESS'
export const CHECK_SIGN_IN_FAIL = 'CHECK_SIGN_IN_FAIL'

export const checkSigninStart = (lastKnownStateOfIsAuthenticated) => (
    {
        type: CHECK_SIGN_IN_START,
        isAuthenticated : lastKnownStateOfIsAuthenticated,
    })

export const signIn = (authenticationCredentials) => (
    {
        type: SIGN_IN_START,
        isAuthenticated : false,
        isAuthenticating : false,
        error : '',
        email : authenticationCredentials.email,
        password: authenticationCredentials.password
    })

export const initializeSignin = () => (
    {
        type: SIGN_IN_INITILIZE,
        isAuthenticated : false,
        isAuthenticating : false,
        error : '',
        email : '',
        password: ''
    })
