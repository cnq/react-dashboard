import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
    MainContainer,
    HomeContainer,
    DashboardContainer,
    SigninContainer,
    FeedContainer,
    SignoutContainer,
    UserContainer,
    AppDetailsContainer
} from 'containers'
import {
    Billing,
    Profile,
    Settings
} from 'components'
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
                    <IndexRoute component={FeedContainer} />
                    <Route path='user/:uid' component={UserContainer} />
                    <Route path='app/:appId' component={AppDetailsContainer} />
                    <Route path='billing' component={Billing} />
                    <Route path='profile' component={Profile} />
                    <Route path='settings' component={Settings} />
                </Route>
            </Router>
        </Router>
    )
}
