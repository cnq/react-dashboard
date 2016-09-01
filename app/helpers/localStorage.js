export const loadFromLocalStorage = (key) => {
    //key is a string: state, auth, user
    try {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) {
            return undefined //if key doesn't exist on localStorage, return undefined to let reducers initialize the app
        }
        return JSON.parse(serializedState)
    } catch (error) {
        return undefined //if an error occurs, return undefined to let reducers initialize the app
    }

}

export const saveToLocalStorage = (key, data) => {
    //key is a string: state, auth, user
    //data is an object containing the data for the key
    try {
        const serializedState = JSON.stringify(data)
        localStorage.setItem(key, serializedState)
    } catch (err) {
        //ignore write errors for now.
        //TODO: log local state write errors.
    }
}

export const removeFromLocalStorage = (key) => {
    //key is a string: state, auth, user
    try {
        localStorage.removeItem(key)
    } catch (err) {
        //ignore delete errors for now.
        //TODO: log local state delete errors.
    }
}
