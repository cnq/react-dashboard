import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { HomeContainer, DashboardContainer, MainContainer, SigninContainer, SignoutContainer, UserActivateContainer, UserSetupContainer, UserResetPasswordContainer, AppsContainer, AppListContainer, ConnectionsContainer, ConnectionListContainer, ConnectionDetailsContainer, ConnectionEditContainer, ConnectionAddStepperContainer, UsersContainer, UserListContainer, UserProfileContainer} from './containers';
import auth from './auth'


const NotFound = React.createClass({
    render() { return <h1>404 Not Found</h1> }
})


const routes = (
  <Route path="/" component={MainContainer}>
    <Route path="signin" component={SigninContainer} />
    <Route path="signout" component={SignoutContainer} />
    <Route path="activate" component={UserActivateContainer} />
    <Route path="profile" component={UserProfileContainer} />
    <Route path="user-setup" component={UserSetupContainer} />
    <Route path="forgot" component={UserResetPasswordContainer} />
    <Route path="dashboard" component={DashboardContainer}>
        <Route path='apps' component={AppsContainer} >
            <IndexRoute component={AppListContainer} />
            <Route path='app/:appId/connections' component={ConnectionsContainer} >
                <IndexRoute component={ConnectionListContainer} />
                <Route path='connection/:connectionId' component={ConnectionDetailsContainer} />
                <Route path='connection/:connectionId/edit' component={ConnectionEditContainer} />
                <Route path='add' component={ConnectionAddStepperContainer} />
            </Route>
        </Route>
        <Route path='users' component={UsersContainer}>
            <IndexRoute component={UserListContainer} />
        </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;