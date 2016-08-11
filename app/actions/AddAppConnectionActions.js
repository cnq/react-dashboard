export const UPDATE_APP_CONNECTION = 'UPDATE_APP_CONNECTION'

export function updateAppConnection (newConnection) {
    return {
        type: UPDATE_APP_CONNECTION,
        newConnection
    }

}