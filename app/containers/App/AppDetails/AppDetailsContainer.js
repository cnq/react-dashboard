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
        if (this.props.appAlreadyFetched === false) {
            this.props.fetchAndHandleApp(this.props.appId)
        } else {
            this.props.removeAppFetching()
        }
    }

    render () {
        return (
            <AppDetails
                authenticatedUser = {this.props.authenticatedUser}
                appId = {this.props.appId}
                isFetching = {this.props.isFetching}
                error = {this.props.error}
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

const mapStateToProps = ({apps, users}, props) => ({
    isFetching: apps.get('isFetching'),
    error: apps.get('error'),
    authenticatedUser: users[users.authenticatedId].info,
    appId: props.routeParams.appId,
    appAlreadyFetched: !!apps.get(props.routeParams.appId)
})

export default connect(
    mapStateToProps,
    actions
)(AppDetailsContainer)
