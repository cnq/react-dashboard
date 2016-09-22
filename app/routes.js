import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainContainer from './containers/MainContainer';
import HomeContainer from './containers/HomeContainer';

const routes = (
  <Route path="/" component={MainContainer}>
    <IndexRoute component={HomeContainer} />
  </Route>
);

export default routes;