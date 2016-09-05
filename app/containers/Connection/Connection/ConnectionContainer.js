import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Connection } from 'components'
import { removeConnection as actions } from 'actions'

const {
    string,
    object,
    func,
    bool
} = PropTypes

/**
 * ConnectionContainer() passes necessary state to the props of
 * the Connection component and sets up methods for handling
 * connection deletion and navigation between connection detail
 * and edit screens.
 **/
class ConnectionContainer extends Component {

    goToConnectionDetail = (event) => {
        event.stopPropagation()
        this.props.router.push(`/dashboard/apps/app/${this.props.appId}/connections/connection/${this.props.connection.get('connectionId')}`)
    }

    goToConnectionEdit = (event) => {
        event.stopPropagation()
        this.props.router.push(`/dashboard/apps/app/${this.props.appId}/connections/connection/${this.props.connection.get('connectionId')}/edit`)
    }

    deleteConnection = (event, connectionId, appId) => {
        event.stopPropagation()
        this.props.deleteAndHandleConnection(connectionId, appId)
        this.props.router.push(`/dashboard/apps/app/${appId}/connections`)
    }

    render () {
        return (
            <Connection
                goToConnectionDetail={this.goToConnectionDetail}
                goToConnectionEdit={this.goToConnectionEdit}
                deleteConnection={this.deleteConnection}
                connection={this.props.connection}
                connectionAlreadyFetched={this.props.connectionAlreadyFetched}
            />
        )
    }

}

ConnectionContainer.propTypes = {
    connection: object.isRequired,
    connectionId: string.isRequired,
    appId: string.isRequired,
    deleteAndHandleConnection: func.isRequired,
    connectionAlreadyFetched: bool.isRequired
}

const mapStateToProps = ({connections}, props) => ({
    connection: connections.get(props.connectionId)
})

export default withRouter(connect(
    mapStateToProps,
    actions
)(ConnectionContainer))
