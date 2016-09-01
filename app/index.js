import React from 'react'
import ReactDOM from 'react-dom'
import throttle from 'lodash/throttle'
import getRoutes from './config/routes'
import { loadFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from './helpers/localStorage'
import * as reducers from './reducers'
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { users as actions } from 'actions'; //TODO: Don't think I need this here.
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

//const persistedState = loadFromLocalStorage('state')

export const store = createStore(
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
console.log(store.getState()) //Have a look at initial state

//TODO: remove these. these are just here temporarily to assist with debugging.
//removeFromLocalStorage('auth')
//removeFromLocalStorage('user')

//If user has token, consider the user to be authenticated
loadFromLocalStorage('auth')
    // Update application state
    ? store.dispatch(actions.fetchAndHandleAuthenticatedUser(loadFromLocalStorage('auth')))
    : undefined

// If store is available then sync browserHistory with store
const history = store ? syncHistoryWithStore(browserHistory, store) : browserHistory

ReactDOM.render(
    <Provider store={store}>
        {getRoutes(history)}
    </Provider>,
    document.getElementById('app')
)
