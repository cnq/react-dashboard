import React from 'react';
import { Route } from 'react-router';
import { Signout } from './components';
import { HomeContainer, DashboardContainer, MainContainer, SigninContainer} from './containers';
import auth from './auth'


const NotFound = React.createClass({
    render() { return <h1>404 Not Found</h1> }
})


const routes = (
  <Route path="/" component={MainContainer}>
      <Route path="signin" component={SigninContainer} />
      <Route path="signout" component={Signout} />
      <Route path="dashboard" component={DashboardContainer}/>
      <Route path="*" component={NotFound} />
  </Route>
);

export default routes;