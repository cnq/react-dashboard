


export const APP_CREATE_INITILIZE = 'APP_CREATE_INITILIZE'
export const APP_CREATE_START = 'APP_CREATE_START'
export const APP_CREATE_REQUEST = 'APP_CREATE_REQUEST'
export const APP_CREATE_SUCCESS = 'APP_CREATE_SUCCESS'
export const APP_CREATE_FAIL = 'APP_CREATE_FAIL'

export const createApp = (backendSiteUri) => (
    {
        type: APP_CREATE_INITILIZE,
        backendSiteUri: backendSiteUri
    })