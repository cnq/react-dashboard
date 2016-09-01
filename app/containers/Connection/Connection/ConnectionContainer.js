import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Connection } from 'components'
import { removeConnection as actions } from 'actions'

const {
    string,
    object,
    func,
    bool
} = PropTypes

//TODO: convert from using contextTypes router to wrapping component in withRouter hoc
const ConnectionContainer = React.createClass({
    propTypes: {
        connection: object.isRequired,
        connectionId: string.isRequired,
        appId: PropTypes.string.isRequired,
        deleteAndHandleConnection: func.isRequired,
        connectionAlreadyFetched: bool.isRequired
    },
    contextTypes: {
        router: object.isRequired
    },
    goToConnectionDetail (event) {
        event.stopPropagation()
        this.context.router.push(`/dashboard/apps/app/${this.props.appId}/connections/connection/${this.props.connection.get('connectionId')}`)
    },
    goToConnectionEdit (event) {
        event.stopPropagation()
        this.context.router.push(`/dashboard/apps/app/${this.props.appId}/connections/connection/${this.props.connection.get('connectionId')}/edit`)
    },
    deleteConnection (event, connectionId, appId) {
        event.stopPropagation()
        this.props.deleteAndHandleConnection(connectionId, appId)
        this.context.router.push(`/dashboard/apps/app/${appId}/connections`)
    },
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
})

const mapStateToProps = ({connections}, props) => ({
    connection: connections.get(props.connectionId)
})

export default connect(
    mapStateToProps, actions
)(ConnectionContainer)
