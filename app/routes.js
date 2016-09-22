import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
import {Signin, Signout} from './components';
import {HomeContainer, DashboardContainer, MainContainer} from './containers';
import auth from './auth'

const App = React.createClass({
    getInitialState() {
        return { loggedIn: auth.loggedIn() }
    },
    updateAuth(loggedIn) {
        this.setState({ loggedIn })
    },
    componentWillMount() {
        auth.onChange = this.updateAuth
        auth.login()
    },
    render() {
        return (
          <div>
            <ul>
              <li>
                {this.state.loggedIn ? (
                  <Link to="/signout">Sign out</Link>
                ) : (
                  <Link to="/signin">Sign in</Link>
              )}
              </li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
            </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </div>
      )
  }
})



const NotFound = React.createClass({
    render() { return <h1>404 Not Found</h1> }
})



function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/signin',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

const routes = (
  <Route path="/" component={App}>
      <Route path="signin" component={Signin} />
      <Route path="signout" component={Signout} />
      <Route path="dashboard" component={DashboardContainer} onEnter={requireAuth} />
      <Route path="*" component={NotFound} />
  </Route>
);

export default routes;