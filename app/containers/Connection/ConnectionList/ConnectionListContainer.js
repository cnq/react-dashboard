import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ConnectionList } from 'components'
import {
    apps as appsActions,
    appsConnections as appsConnectionsActions
} from 'actions'

const { string, number, func, array, bool, object } = PropTypes

const ConnectionListContainer = React.createClass({
    propTypes: {
        connectionIds: array.isRequired,
        appId: string.isRequired,
        error: string.isRequired,
        isFetching: bool.isRequired,
        fetchAndHandleApp: func.isRequired,
        fetchAndHandleAppsConnections: func.isRequired,
        lastUpdatedApp: number.isRequired,
        lastUpdatedConnections: number.isRequired
    },
    contextTypes: {
        router: object.isRequired
    },
    componentDidMount () {
        const appId = this.props.appId
        this.props.fetchAndHandleApp(appId)
        this.props.fetchAndHandleAppsConnections(appId)
    },
    goToAddAppConnections (event) {
        event.stopPropagation()
        this.context.router.push('/dashboard/app/' + this.props.appId + '/connections/add')
    },
    render () {
        return (
            <ConnectionList
                connectionIds={this.props.connectionIds}
                appId={this.props.appId}
                goToAddAppConnections={this.goToAddAppConnections}
                error={this.props.error}
                isFetching={this.props.isFetching}
            />
        )
    }
})

function mapStateToProps ({apps, appsConnections}, props) {
    const specificAppsConnections = appsConnections[props.params.appId]
    const app = apps[props.params.appId]
    return {
        isFetching: apps.isFetching || appsConnections.isFetching ? true : false,
        error: apps.error || appsConnections.error,
        connectionIds: specificAppsConnections ? specificAppsConnections.connectionIds : [],
        lastUpdatedApp: app ? app.lastUpdated : 0,
        lastUpdatedConnections: specificAppsConnections ? specificAppsConnections.lastUpdated : 0,
        appId: props.params.appId
    }
}

export default connect(
    mapStateToProps,
    {...appsActions, ...appsConnectionsActions}
)(ConnectionListContainer)
