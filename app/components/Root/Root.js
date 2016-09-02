import React from 'react'
import { Provider } from 'react-redux'
import getRoutes from 'config/routes'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

function Root ({ store }) {
    // If store is available then sync browserHistory with store
    const history = store ? syncHistoryWithStore(browserHistory, store) : browserHistory
    return (
        <Provider store={store}>
            {getRoutes(history)}
        </Provider>
    )
}

export default Root
