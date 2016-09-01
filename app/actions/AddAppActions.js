export const ACTIVATE_ADD_APP = 'ACTIVATE_ADD_APP'
export const DEACTIVATE_ADD_APP = 'DEACTIVATE_ADD_APP'
export const UPDATE_BACKEND_SITE_URI = 'UPDATE_BACKEND_SITE_URI'
export const UPDATE_URI = 'UPDATE_URI'

export const activateAddApp = () => ({
    type: ACTIVATE_ADD_APP
})

export const deactivateAddApp = () => ({
    type: DEACTIVATE_ADD_APP
})

export const updateBackendSiteUri = (newBackendSiteUri) => ({
    type: UPDATE_BACKEND_SITE_URI,
    newBackendSiteUri
})

export const updateUri = (newUri) => ({
    type: UPDATE_URI,
    newUri
})