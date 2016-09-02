import React from 'react'
import ReactDOM from 'react-dom'
import Root from 'components/Root/Root'
import configureStore from 'config/store'
import { loadFromLocalStorage } from 'helpers/localStorage'
import { users as actions } from 'actions';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore()
console.log(store)
//TODO: remove these. these are just here temporarily to assist with debugging.
//removeFromLocalStorage('auth')
//removeFromLocalStorage('user')

//If user has token, consider the user to be authenticated
loadFromLocalStorage('auth')
    // Update application state
    ? store.dispatch(actions.fetchAndHandleAuthenticatedUser(loadFromLocalStorage('auth')))
    : null

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
)
