import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Connection } from 'components'
import { removeConnection as actions } from 'actions'

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
        //redirect user to dashboard if we are in the details view
        if (this.props.router.isActive({ pathname: `/dashboard/apps/app/${this.props.appId}/connections/connection/${this.props.connection.get('connectionId')}`}))
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
    connection: PropTypes.object.isRequired,
    connectionId: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,
    deleteAndHandleConnection: PropTypes.func.isRequired,
    connectionAlreadyFetched: PropTypes.bool.isRequired
}

const mapStateToProps = ({connections}, props) => ({
    connection: connections.get(props.connectionId)
})

export default withRouter(connect(
    mapStateToProps,
    actions
)(ConnectionContainer))
