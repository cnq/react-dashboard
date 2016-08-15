export const ACTIVATE_ADD_APP = 'ACTIVATE_ADD_APP'
export const DEACTIVATE_ADD_APP = 'DEACTIVATE_ADD_APP'
export const UPDATE_BACKEND_SITE_URI = 'UPDATE_BACKEND_SITE_URI'
export const UPDATE_URI = 'UPDATE_URI'

export function activateAddApp () {
    return {
        type: ACTIVATE_ADD_APP
    }
}

export function deactivateAddApp () {
    return {
        type: DEACTIVATE_ADD_APP
    }
}

export function updateBackendSiteUri (newBackendSiteUri) {
    return {
        type: UPDATE_BACKEND_SITE_URI,
        newBackendSiteUri
    }
}

export function updateUri (newUri) {
    return {
        type: UPDATE_URI,
        newUri
    }
}