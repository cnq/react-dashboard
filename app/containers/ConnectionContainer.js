import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Connection } from 'components'
import { connectionActions as actions } from 'actions'

class ConnectionContainer extends Component {

    deleteConnection = (connection) => {
        this.props.connectionDeleteInitialize(connection)
        //redirect user to dashboard if we are in the details view
        if (this.props.router.isActive({ pathname: `/dashboard/apps/app/${this.props.connection.appId}/connections/connection/${this.props.connection.connectionId}`}))
            this.props.router.push(`/dashboard/apps/app/${this.props.connection.appId}/connections`)
    }

    render () {
        return (
            <Connection deleteConnection={this.deleteConnection} connection={this.props.connection} uri={this.props.uri} />
        )
    }

}

ConnectionContainer.propTypes = {
    uri: PropTypes.string.isRequired,
    connection: PropTypes.object.isRequired,
    connectionDeleteInitialize: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
})

export default withRouter(connect(
    mapStateToProps,
    actions
)(ConnectionContainer))
