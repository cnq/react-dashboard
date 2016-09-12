import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import { EditConnection } from 'components'
import { connect } from 'react-redux'
import {
    updateConnectionStepper as updateConnectionStepperActions,
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

const mapStateToProps = ({updateConnectionStepper, editingConnection, connections, apps}, {params}) => ({
    connectionId: params.connectionId,
    app: apps.get(params.appId) ? apps.get(params.appId) : Map({}),
    connectionUri: updateConnectionStepper.connectionUri || updateConnectionStepper.isEditingConnectionUri  //check if the connection uri exists or if the user is currently editing the connection uri
                        ?   updateConnectionStepper.connectionUri //if either is true
                        :   connections.getIn([params.connectionId, 'connectionUri']), //if neither is true then grab the connection uri from the connections object (getIn is an ImmutableJS method: https://facebook.github.io/immutable-js/docs/#/Map)
    connectionType: updateConnectionStepper.connectionType || updateConnectionStepper.isEditingConnectionType
                        ?   updateConnectionStepper.connectionType
                        :   connections.getIn([params.connectionId, 'connectionType']),
    connectionName: updateConnectionStepper.connectionName || updateConnectionStepper.isEditingConnectionName
                        ?   updateConnectionStepper.connectionName
                        :   connections.getIn([params.connectionId, 'connectionName']),
    isActive: updateConnectionStepper.isActive
})

export default connect(
    mapStateToProps,
    {...updateConnectionStepperActions, ...connectionsActions, ...appsActions}
)(EditConnectionContainer)
