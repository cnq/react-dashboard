//import throttle from 'lodash/throttle'
import * as reducers from 'reducers'
import * as epics from 'epics'
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'
import { loadFromLocalStorage, saveToLocalStorage } from 'helpers/localStorage'

const configureStore = () => {

    // TODO: Add epics to control action order
    // const epicMiddleware = createEpicMiddleware(
    //     combineEpics(
    //         ...epics
    //     )
    // );

    //TODO: Enable persisted state of certain data
    //const persistedState = loadFromLocalStorage('state')

    //const middlewares = [thunk, epicMiddleware]
    const middlewares = [thunk]

    if (process.env.NODE_ENV != 'production') {
        middlewares.push(logger())
    }

    const store = createStore(
        combineReducers({
            ...reducers,
            form,
            routing: routerReducer
        }),
        //persistedState,
        compose (
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : (f) => f
        )
    )

    if (window.devToolsExtension) {
        window.devToolsExtension.updateStore(store);
    }

    //TODO: work on persisting state to the local storage. Reference Idiomatic Redux on egghead.io
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
