// APP INDEX
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store'
import configureHistory from './history'
import combinedReducer from './reducers';
import { combinedEpic } from './epics';
import { applist } from './actions';
import routes from './routes';

injectTapEventPlugin();

const store = configureStore(browserHistory, combinedReducer, combinedEpic);
const history = configureHistory(browserHistory, routes, store);


store.dispatch(applist.initializeAppList())

ReactDOM.render((
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>
), document.getElementById('root'));
