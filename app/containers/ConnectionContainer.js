import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Connection } from 'components'
import { connectionActions as actions } from 'actions'
import { getConnection } from '../reducers'

class ConnectionContainer extends Component {

    deleteConnection = (event, connection) => {
        event.stopPropagation()
        this.props.deleteConnection(connection)
        //redirect user to dashboard if we are in the details view
        if (this.props.router.isActive({ pathname: `/dashboard/apps/app/${this.props.connection.appId}/connections/connection/${this.props.connection.connectionId}`}))
            this.props.router.push(`/dashboard/apps/app/${this.props.connection.appId}/connections`)
    }

    render () {
        return (
            <Connection deleteConnection={this.deleteConnection} connection={this.props.connection} />
        )
    }

}

ConnectionContainer.propTypes = {
    connection: PropTypes.object.isRequired,
    deleteConnection: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
})

export default withRouter(connect(
    mapStateToProps,
    actions
)(ConnectionContainer))
