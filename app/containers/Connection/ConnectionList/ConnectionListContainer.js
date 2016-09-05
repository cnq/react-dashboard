import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ConnectionList } from 'components'
import {
    apps as appsActions,
    appsConnections as appsConnectionsActions
} from 'actions'

const {
    string,
    number,
    func,
    array,
    bool
} = PropTypes

/**
 * ConnectionListContainer() passes necessary state to the props of
 * the ConnectionList component.
 */
class ConnectionListContainer extends Component {

    componentDidMount () {
        //TODO: there is an issue on reload that appId is not available
        const appId = this.props.appId
        this.props.fetchAndHandleApp(appId)
        this.props.fetchAndHandleAppsConnections(appId)
    }

    goToAddAppConnections = (event) => {
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + this.props.appId + '/connections/add')
    }

    render () {
        return (
            <ConnectionList
                connectionIds={this.props.connectionIds}
                appId={this.props.appId}
                goToAddAppConnections={this.goToAddAppConnections}
                error={this.props.error}
                isFetching={this.props.isFetching}
                connectionAlreadyFetched={false}
            />
        )
    }

}

ConnectionListContainer.propTypes = {
    connectionIds: array.isRequired,
    appId: string.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    fetchAndHandleApp: func.isRequired,
    fetchAndHandleAppsConnections: func.isRequired,
    lastUpdatedApp: number.isRequired,
    lastUpdatedConnections: number.isRequired
}

const mapStateToProps = ({apps, appsConnections}, props) => ({
    isFetching: apps.isFetching || appsConnections.isFetching ? true : false,
    error: apps.error || appsConnections.error,
    connectionIds: appsConnections[props.params.appId] ? appsConnections[props.params.appId].connectionIds : [],
    lastUpdatedApp: apps[props.params.appId] ? apps[props.params.appId].lastUpdated : 0,
    lastUpdatedConnections: appsConnections[props.params.appId] ? appsConnections[props.params.appId].lastUpdated : 0,
    appId: props.params.appId
})

export default withRouter(connect(
    mapStateToProps,
    {...appsActions, ...appsConnectionsActions}
)(ConnectionListContainer))
