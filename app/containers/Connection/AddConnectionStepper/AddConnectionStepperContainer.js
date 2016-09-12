import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import { AddConnectionStepper } from 'components'
import { connect } from 'react-redux'
import {
    updateConnectionStepper as updateConnectionStepperActions,
    connections as connectionsActions,
    apps as appsActions
} from 'actions'

/**
 * AddConnectionStepperContainer() passes necessary state to the props of
 * the AddConnectionStepper component.
 */
class AddConnectionStepperContainer extends Component {
    render () {
        return (
            <AddConnectionStepper
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({updateConnectionStepper, apps}, {params}) => ({
    app: apps.get(params.appId) ? apps.get(params.appId) : Map({}),
    connectionUri: updateConnectionStepper.connectionUri,
    connectionType: updateConnectionStepper.connectionType,
    connectionName: updateConnectionStepper.connectionName,
    isActive: updateConnectionStepper.isActive
})

export default connect(
    mapStateToProps,
    {...updateConnectionStepperActions, ...connectionsActions, ...appsActions}
)(AddConnectionStepperContainer)
