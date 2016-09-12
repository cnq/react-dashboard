export const ACTIVATE_ADD_APP_CARD = 'ACTIVATE_ADD_APP_CARD'
export const DEACTIVATE_ADD_APP_CARD = 'DEACTIVATE_ADD_APP_CARD'
export const UPDATE_BACKEND_SITE_URI = 'UPDATE_BACKEND_SITE_URI'
export const UPDATE_URI = 'UPDATE_URI'

export const activateAddAppCard = () => ({
    type: ACTIVATE_ADD_APP_CARD
})

export const deactivateAddAppCard = () => ({
    type: DEACTIVATE_ADD_APP_CARD
})

export const updateBackendSiteUri = (newBackendSiteUri) => ({
    type: UPDATE_BACKEND_SITE_URI,
    newBackendSiteUri
})

export const updateUri = (newUri) => ({
    type: UPDATE_URI,
    newUri
})