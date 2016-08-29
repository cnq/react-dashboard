import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import { EditConnection } from 'components'
import { connect } from 'react-redux'
import {
    updateConnection as updateConnectionActions,
    connections as connectionsActions,
    apps as appsActions
} from 'actions'

const EditConnectionContainer = React.createClass({
    render () {
        return (
            <EditConnection
                {...this.props}
            />
        )
    }
})

function mapStateToProps({updateConnection, connections, apps}, props) {
    return {
        connectionId: props.params.connectionId,
        app: apps.get(props.params.appId) ? apps.get(props.params.appId) : Map({}),
        connectionUri: updateConnection.connectionUri ?  updateConnection.connectionUri : connections.getIn([props.params.connectionId, 'connectionUri']),
        connectionType: updateConnection.connectionType ?  updateConnection.connectionType : connections.getIn([props.params.connectionId, 'connectionType']),
        connectionName: updateConnection.connectionName ?  updateConnection.connectionName : connections.getIn([props.params.connectionId, 'connectionName']),
        isActive: updateConnection.isActive
    }
}

export default connect(
    mapStateToProps,
    {...updateConnectionActions, ...connectionsActions, ...appsActions}
)(EditConnectionContainer)