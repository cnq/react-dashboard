import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { App } from 'components'
import {
    removeApp as removeAppActions,
    appsConnections as appsConnectionsActions
} from 'actions'

const {
    object,
    func,
    string,
    bool,
    array
} = PropTypes

/**
 * AppContainer() passes state to the props of
 * the App component and sets up the actions required
 * for managing app creation, deletion and navigating
 * between app details and connection details.
 **/
class AppContainer extends Component {

    componentDidMount () {
        const appId = this.props.appId
        this.props.fetchAndHandleAppsConnections(appId)
    }

    goToAppDetail = (event) => {
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + this.props.app.get('appId'))
    }

    goToAppConnections = (event) => {
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + this.props.app.get('appId') + '/connections')
    }

    deleteApp = (event, appId, uid) => {
        event.stopPropagation()
        this.props.deleteAndHandleApp(appId, uid)
    }

    render () {
        return (
            <App
                isFetching={this.props.isFetching}
                error={this.props.error}
                app={this.props.app}
                connectionIds={this.props.connectionIds}
                goToAppDetail={this.goToAppDetail}
                goToAppConnections={this.goToAppConnections}
                deleteApp={this.deleteApp}
            />
        )
    }
}

AppContainer.propTypes = {
    isFetching: bool.isRequired,
    error: string.isRequired,
    app: object.isRequired,
    connectionIds: array.isRequired,
    deleteAndHandleApp: func.isRequired,
    fetchAndHandleAppsConnections: func.isRequired
}

const mapStateToProps = ({apps, appsConnections}, props) => ({
    isFetching: apps.isFetching || appsConnections.isFetching ? true : false,
    error: apps.error || appsConnections.error,
    app: apps.get(props.appId),
    connectionIds: appsConnections[props.appId] ? appsConnections[props.appId].connectionIds : []
})

export default withRouter(connect(
    mapStateToProps,
    {...removeAppActions, ...appsConnectionsActions}
)(AppContainer))
