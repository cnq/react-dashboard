import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
    MainContainer,
    HomeContainer,
    DashboardContainer,
    SigninContainer,
    AppsContainer,
    AppListContainer,
    SignoutContainer,
    UserContainer,
    AppDetailsContainer,
    ConnectionsContainer,
    ConnectionListContainer,
    ConnectionContainer,
    ConnectionDetailsContainer,
    AddConnectionContainer,
    EditConnectionContainer
} from 'containers'
import {
    Billing,
    UserProfile,
    Settings
} from 'views'
import {
    CheckAuthentication
} from 'hocs'

export default function getRoutes (history) {
    return (
        <Router history={history}>
            <Router path='/' component={CheckAuthentication(MainContainer)}>
                <IndexRoute component={HomeContainer} />
                <Route path='signin' component={SigninContainer} />
                <Route path='signout' component={SignoutContainer} />
                <Route path='dashboard' component={DashboardContainer} >
                    <Route path='apps' component={AppsContainer} >
                        <IndexRoute component={AppListContainer} />
                        <Route path='app/:appId' component={AppDetailsContainer} />
                        <Route path='app/:appId/connections' component={ConnectionsContainer} >
                            <IndexRoute component={ConnectionListContainer} />
                            <Route path='connection/:connectionId' component={ConnectionDetailsContainer} />
                            <Route path='connection/:connectionId/edit' component={EditConnectionContainer} />
                            <Route path='add' component={AddConnectionContainer} />
                        </Route>
                    </Route>
                    <Route path='user/:uid' component={UserContainer} />
                    <Route path='billing' component={Billing} />
                    <Route path='settings' component={Settings} />
                </Route>
            </Router>
        </Router>
    )
}
