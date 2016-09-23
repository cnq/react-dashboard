import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
import {Signin, Signout} from './components';
import {HomeContainer, DashboardContainer, MainContainer, SigninContainer} from './containers';
import auth from './auth'

const App = React.createClass({
    getInitialState() {
        return { isAuthenticated: auth.loggedIn() }
    },
    updateAuth(isAuthenticated) {
        this.setState({ isAuthenticated })
    },
    componentWillMount() {
        auth.onChange = this.updateAuth
    },
    render() {
        return (
            <MainContainer isAuthenticated = {this.state.isAuthenticated}>
                {this.props.children }
            </MainContainer>
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
      <Route path="signin" component={SigninContainer} />
      <Route path="signout" component={Signout} />
      <Route path="dashboard" component={DashboardContainer} onEnter={requireAuth} />
      <Route path="*" component={NotFound} />
  </Route>
);

export default routes;