export const UPDATE_CONNECTION_URI = 'UPDATE_CONNECTION_URI'
export const UPDATE_CONNECTION_TYPE = 'UPDATE_CONNECTION_TYPE'
export const UPDATE_CONNECTION_NAME = 'UPDATE_CONNECTION_NAME'

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
