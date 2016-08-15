export const ACTIVATE_ADD_CONNECTION= 'ACTIVATE_ADD_CONNECTION'
export const DEACTIVATE_ADD_CONNECTION = 'DEACTIVATE_ADD_CONNECTION'
export const UPDATE_CONNECTION_URI = 'UPDATE_CONNECTION_URI'
export const UPDATE_CONNECTION_TYPE = 'UPDATE_CONNECTION_TYPE'
export const UPDATE_CONNECTION_NAME = 'UPDATE_CONNECTION_NAME'

export function activateAddConnection () {
    return {
        type: ACTIVATE_ADD_CONNECTION
    }
}

export function deactivateAddConnection () {
    return {
        type: DEACTIVATE_ADD_CONNECTION
    }
}

export function updateConnectionUri (newConnectionUri) {
    return {
        type: UPDATE_CONNECTION_URI,
        newConnectionUri
    }
}

export function updateConnectionType (newConnectionType) {
    return {
        type: UPDATE_CONNECTION_TYPE,
        newConnectionType
    }
}

export function updateConnectionName (newConnectionName) {
    return {
        type: UPDATE_CONNECTION_NAME,
        newConnectionName
    }
}
