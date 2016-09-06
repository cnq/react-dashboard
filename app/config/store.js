//import throttle from 'lodash/throttle'
import * as reducers from 'reducers'
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadFromLocalStorage, saveToLocalStorage } from 'helpers/localStorage'


const configureStore = () => {
    //const persistedState = loadFromLocalStorage('state')

    const store = createStore(
        combineReducers({
            ...reducers,
            form,
            routing: routerReducer
        }),
        //persistedState,
        compose (
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : (f) => f
        )
    )

    //TODO: work on persisting state to the local storage
    //save the state anytime it changes
    //only want to persist the data, not the ui state
    //using throttle to avoid updating local storage every time there is a change in state
    //limiting writes to local storage to once per second
    //store.subscribe(throttle(() => { //listen for any state change
        //saveToLocalStorage(
            //'state',
            //{
                //users: store.getState().users,
                //apps: store.getState().apps,
                //connections: store.getState.connections
            //}
        //) //pass current state to saveState
    //}, 1000)

    //console.log(store.getState()) //Have a look at initial state

    return store;

}

export default configureStore
