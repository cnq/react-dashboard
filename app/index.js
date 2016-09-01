import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
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

const persistedState = {}

export const store = createStore(
    combineReducers({
        ...reducers,
        form,
        routing: routerReducer
    }),
    persistedState,
    compose (
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)
console.log(store.getState()) //Have a look at initial state

//TODO: remove these. these are just here temporarily to assist with debugging.
//localStorage.removeItem('auth')
//localStorage.removeItem('user')

// Retrieve auth string and turn it back into an object by using JSON.parse
const authData = JSON.parse(localStorage.getItem('auth'))
//If user has token, consider the user to be authenticated
authData
    // Update application state
    ? store.dispatch(actions.fetchAndHandleAuthenticatedUser(authData))
    : null

// If store is available then sync browserHistory with store
const history = store ? syncHistoryWithStore(browserHistory, store) : browserHistory

ReactDOM.render(
    <Provider store={store}>
        {getRoutes(history)}
    </Provider>,
    document.getElementById('app')
)
