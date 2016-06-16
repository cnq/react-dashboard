export const ADD_LISTENER = 'ADD_LISTENER'

export function addListener (listenerId) {
    return {
        type: ADD_LISTENER,
        listenerId
    }
}
