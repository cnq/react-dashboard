export const UPDATE_CONNECTION_URI = 'UPDATE_CONNECTION_URI'
export const UPDATE_CONNECTION_TYPE = 'UPDATE_CONNECTION_TYPE'
export const UPDATE_CONNECTION_NAME = 'UPDATE_CONNECTION_NAME'
export const EDITING_CONNECTION_URI = 'EDITING_CONNECTION_URI'
export const EDITING_CONNECTION_TYPE = 'EDITING_CONNECTION_TYPE'
export const EDITING_CONNECTION_NAME = 'EDITING_CONNECTION_NAME'
export const EDITING_CONNECTION_URI_COMPLETE = 'EDITING_CONNECTION_URI_COMPLETE'
export const EDITING_CONNECTION_TYPE_COMPLETE = 'EDITING_CONNECTION_TYPE_COMPLETE'
export const EDITING_CONNECTION_NAME_COMPLETE = 'EDITING_CONNECTION_NAME_COMPLETE'

export const updateConnectionUri = (newConnectionUri) => ({
    type: UPDATE_CONNECTION_URI,
    newConnectionUri
})

export const updateConnectionType = (newConnectionType) => ({
    type: UPDATE_CONNECTION_TYPE,
    newConnectionType
})

export const updateConnectionName = (newConnectionName) => ({
    type: UPDATE_CONNECTION_NAME,
    newConnectionName
})

export const editingConnectionUri = () => ({
    type: EDITING_CONNECTION_URI
})

export const editingConnectionType = () => ({
    type: EDITING_CONNECTION_TYPE
})

export const editingConnectionName = () => ({
    type: EDITING_CONNECTION_NAME
})

export const editingConnectionUriComplete = () => ({
    type: EDITING_CONNECTION_URI_COMPLETE
})

export const editingConnectionTypeComplete = () => ({
    type: EDITING_CONNECTION_TYPE_COMPLETE
})

export const editingConnectionNameComplete = () => ({
    type: EDITING_CONNECTION_NAME_COMPLETE
})
