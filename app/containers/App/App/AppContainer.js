import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { App } from 'components'
import {
    removeApp as removeAppActions,
    appsConnections as appsConnectionsActions
} from 'actions'

const { object, func, string, bool, array } = PropTypes

//TODO: convert from using contextTypes router to wrapping component in withRouter hoc
const AppContainer = React.createClass({
    propTypes: {
        isFetching: bool.isRequired,
        error: string.isRequired,
        app: object.isRequired,
        connectionIds: array.isRequired,
        deleteAndHandleApp: func.isRequired,
        fetchAndHandleAppsConnections: func.isRequired
    },
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    componentDidMount () {
        const appId = this.props.appId
        this.props.fetchAndHandleAppsConnections(appId)
    },
    goToAppDetail (event) {
        event.stopPropagation()
        this.context.router.push('/dashboard/apps/app/' + this.props.app.get('appId'))
    },
    goToAppConnections (event) {
        event.stopPropagation()
        this.context.router.push('/dashboard/apps/app/' + this.props.app.get('appId') + '/connections')
    },
    deleteApp (event, appId, uid) {
        event.stopPropagation()
        this.props.deleteAndHandleApp(appId, uid)
    },
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
})

const mapStateToProps = ({apps, appsConnections}, props) => ({
    isFetching: apps.isFetching || appsConnections.isFetching ? true : false,
    error: apps.error || appsConnections.error,
    app: apps.get(props.appId),
    connectionIds: appsConnections[props.appId] ? appsConnections[props.appId].connectionIds : []
})

export default connect(
    mapStateToProps,
    {...removeAppActions, ...appsConnectionsActions}
)(AppContainer)
