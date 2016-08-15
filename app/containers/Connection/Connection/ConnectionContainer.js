import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Connection } from 'components'
import { removeConnection as actions } from 'actions'

const { object, func } = PropTypes

//TODO: convert from using contextTypes router to wrapping component in withRouter hoc
const ConnectionContainer = React.createClass({
    propTypes: {
        connection: object.isRequired,
        appId: PropTypes.string.isRequired,
        deleteAndHandleConnection: func.isRequired
    },
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    goToConnectionDetail (event) {
        event.stopPropagation()
        this.context.router.push(`/dashboard/app/:${this.props.appId}/connections/${this.props.connection.get('connectionId')}`)
    },
    deleteConnection (event, connectionId, appId) {
        event.stopPropagation()
        this.props.deleteAndHandleConnection(connectionId, appId)
    },
    render () {
        return (
            <Connection
                goToConnectionDetail={this.goToConnectionDetail}
                deleteConnection={this.deleteConnection}
                {...this.props}
            />
        )
    }
})

function mapStateToProps ({connections}) {
    return {
        connection: connections.get(props.connectionId),
    }
}

export default connect(
    mapStateToProps, actions
)(ConnectionContainer)
