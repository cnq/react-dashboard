import React, { Component, PropTypes } from 'react'
import { AppDetails } from 'components'
import { connect } from 'react-redux'
import { apps as actions } from 'actions'

const {
    object,
    string,
    bool,
    func
} = PropTypes

/**
* AppDetailsContainer() passes state to the props of
* the AppDetails component.
**/
class AppDetailsContainer extends Component {

    componentDidMount () {
        if (this.appAlreadyFetched === false) {
            this.fetchAndHandleApp(this.appId)
        } else {
            this.removeAppFetching()
        }
    }

    render () {
        return (
            <AppDetails
                authenticatedUser = {this.authenticatedUser}
                appId = {this.appId}
                isFetching = {this.isFetching}
                error = {this.error}
            />
        )
    }

}

AppDetailsContainer.propTypes = {
    authenticatedUser: object.isRequired,
    appId: string.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired,
    appAlreadyFetched: bool.isRequired,
    removeAppFetching: func.isRequired,
    fetchAndHandleApp: func.isRequired
}

const mapStateToProps = ({apps, users}, {routeParams}) => ({
    isFetching: apps.get('isFetching'),
    error: apps.get('error'),
    authenticatedUser: users[users.authenticatedId].info,
    appId: routeParams.appId,
    appAlreadyFetched: !!apps.get(routeParams.appId)
})

export default connect(
    mapStateToProps,
    actions
)(AppDetailsContainer)
