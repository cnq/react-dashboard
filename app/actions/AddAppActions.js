export const ACTIVATE_ADD_APP = 'ACTIVATE_ADD_APP'
export const DEACTIVATE_ADD_APP = 'DEACTIVATE_ADD_APP'
export const UPDATE_APP_DOMAIN = 'UPDATE_APP_DOMAIN'
export const UPDATE_DEV_DOMAIN = 'UPDATE_DEV_DOMAIN'

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

export function updateAppDomain (newAppDomain) {
    return {
        type: UPDATE_APP_DOMAIN,
        newAppDomain
    }

}

export function updateDevDomain (newDevDomain) {
    return {
        type: UPDATE_DEV_DOMAIN,
        newDevDomain
    }

}