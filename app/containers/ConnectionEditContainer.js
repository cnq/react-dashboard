import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import { ConnectionEdit } from 'components'
import { connect } from 'react-redux'
import { connectionStepper as connectionStepperActions, connections as connectionsActions, apps as appsActions } from 'actions'


class ConnectionEditContainer extends Component {
    render () {
        return (
            <ConnectionEdit {...this.props} />
        )
    }
}

const mapStateToProps = ({connectionStepper, editingConnection, connections, apps}, {params}) => ({
    connectionId: params.connectionId,
    app: apps.get(params.appId) ? apps.get(params.appId) : Map({}),
    connectionUri: connectionStepper.connectionUri || connectionStepper.isEditingConnectionUri  //check if the connection uri exists or if the user is currently editing the connection uri
                        ?   connectionStepper.connectionUri //if either is true
                        :   connections.getIn([params.connectionId, 'connectionUri']), //if neither is true then grab the connection uri from the connections object (getIn is an ImmutableJS method: https://facebook.github.io/immutable-js/docs/#/Map)
    connectionType: connectionStepper.connectionType || connectionStepper.isEditingConnectionType
                        ?   connectionStepper.connectionType
                        :   connections.getIn([params.connectionId, 'connectionType']),
    connectionName: connectionStepper.connectionName || connectionStepper.isEditingConnectionName
                        ?   connectionStepper.connectionName
                        :   connections.getIn([params.connectionId, 'connectionName']),
    isActive: connectionStepper.isActive
})

export default connect(
    mapStateToProps,
    {...connectionStepperActions, ...connectionsActions, ...appsActions}
)(ConnectionEditContainer)
