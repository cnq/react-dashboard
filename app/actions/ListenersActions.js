export const ADD_LISTENER = 'ADD_LISTENER'
export const REMOVE_LISTENER = 'REMOVE_LISTENER'

export const addListener = (listenerId) => ({
    type: ADD_LISTENER,
    listenerId
})

export const removeListener = (listenerId) => ({
    type: REMOVE_LISTENER,
    listenerId
})
