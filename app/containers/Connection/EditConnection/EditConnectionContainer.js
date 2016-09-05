import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import { EditConnection } from 'components'
import { connect } from 'react-redux'
import {
    updateConnection as updateConnectionActions,
    connections as connectionsActions,
    apps as appsActions
} from 'actions'

/**
 * EditConnectionContainer() passes necessary state to the props of
 * the EditConnection component.
 */
class EditConnectionContainer extends Component {
    render () {
        return (
            <EditConnection
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({updateConnection, editingConnection, connections, apps}, props) => ({
    connectionId: props.params.connectionId,
    app: apps.get(props.params.appId) ? apps.get(props.params.appId) : Map({}),
    connectionUri: updateConnection.connectionUri || updateConnection.isEditingConnectionUri  //check if the connection uri exists or if the user is currently editing the connection uri
                        ?   updateConnection.connectionUri //if either is true
                        :   connections.getIn([props.params.connectionId, 'connectionUri']), //if neither is true then grab the connection uri from the connections object (getIn is an ImmutableJS method: https://facebook.github.io/immutable-js/docs/#/Map)
    connectionType: updateConnection.connectionType || updateConnection.isEditingConnectionType
                        ?   updateConnection.connectionType
                        :   connections.getIn([props.params.connectionId, 'connectionType']),
    connectionName: updateConnection.connectionName || updateConnection.isEditingConnectionName
                        ?   updateConnection.connectionName
                        :   connections.getIn([props.params.connectionId, 'connectionName']),
    isActive: updateConnection.isActive
})

export default connect(
    mapStateToProps,
    {...updateConnectionActions, ...connectionsActions, ...appsActions}
)(EditConnectionContainer)
