import React, { Component, PropTypes } from 'react'
import { ConnectionAddStepper } from 'components'
import { getApp } from '../reducers'
import { connect } from 'react-redux'
import { connectionStepperActions , connectionActions } from 'actions'
 
class ConnectionAddStepperContainer extends Component {
    render () {
        return ( <ConnectionAddStepper {...this.props} />)
    }
}

const mapStateToProps = (state, {params}) => {
return {
    app: getApp(state, params.appId),
    connectionUri: state.connectionStepper.connectionUri,
    connectionType: state.connectionStepper.connectionType,
    connectionName: state.connectionStepper.connectionName,
    isActive: state.connectionStepper.isActive
}}

export default connect(
    mapStateToProps,
    {...connectionStepperActions, ...connectionActions}
)(ConnectionAddStepperContainer)
