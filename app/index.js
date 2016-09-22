// APP INDEX
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from 'config/store'
import configureHistory from 'config/history'
import combinedReducer from './reducers';
import routes from './routes';

injectTapEventPlugin();

const store = configureStore(browserHistory, combinedReducer);
const history = configureHistory(browserHistory, routes, store);

ReactDOM.render((
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>
), document.getElementById('root'));
