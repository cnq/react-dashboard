
// Connection Create Actions
export const CONNECTION_CREATE_INITILIZE = 'CONNECTION_CREATE_INITILIZE'
export const CONNECTION_CREATE_START = 'CONNECTION_CREATE_START'
export const CONNECTION_CREATE_REQUEST = 'CONNECTION_CREATE_REQUEST'
export const CONNECTION_CREATE_SUCCESS = 'CONNECTION_CREATE_SUCCESS'
export const CONNECTION_CREATE_FAIL = 'CONNECTION_CREATE_FAIL'

export const connectionCreateInitialize = (connectionToAdd) => ({ type: CONNECTION_CREATE_INITILIZE, connection: connectionToAdd })
export const connectionCreateStart = (connectionToAdd) => ({ type: CONNECTION_CREATE_START, connection: connectionToAdd })
export const connectionCreateRequest = () => ({ type: CONNECTION_CREATE_REQUEST })
export const connectionCreateSuccess = (newConnection) => ({ type: CONNECTION_CREATE_SUCCESS, connection: newConnection })
export const connectionCreateFail = (errorMessage) => ({ type: connectionCreateFail, error: errorMessage })

// Connection Delete Actions
export const CONNECTION_DELETE_INITILIZE = 'CONNECTION_DELETE_INITILIZE'
export const CONNECTION_DELETE_START = 'CONNECTION_DELETE_START'
export const CONNECTION_DELETE_REQUEST = 'CONNECTION_DELETE_REQUEST'
export const CONNECTION_DELETE_SUCCESS = 'CONNECTION_DELETE_SUCCESS'
export const CONNECTION_DELETE_FAIL = 'CONNECTION_DELETE_FAIL'

export const connectionDeleteInitialize = (connectionToDelete) => ({ type: CONNECTION_DELETE_INITILIZE, connection: connectionToDelete })
export const connectionDeleteStart = (connectionToDelete) => ({ type: CONNECTION_DELETE_START, connection: connectionToDelete })
export const connectionDeleteRequest = () => ({ type: CONNECTION_DELETE_REQUEST })
export const connectionDeleteSuccess = (connectionToDelete) => ({ type: CONNECTION_DELETE_SUCCESS, connection: connectionToDelete })
export const connectionDeleteFail = (connectionToDelete, errorMessage) => ({ type: CONNECTION_DELETE_FAIL, connection: connectionToDelete, error: errorMessage })