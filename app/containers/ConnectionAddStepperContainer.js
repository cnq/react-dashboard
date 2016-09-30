import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import { ConnectionAddStepper } from 'components'
import { connect } from 'react-redux'
import { connectionStepperActions , connectionActions, applist as appListActions } from 'actions'
 
class ConnectionAddStepperContainer extends Component {
    render () {
        return ( <ConnectionAddStepper {...this.props} />)
    }
}

const mapStateToProps = ({connectionStepper, applist}, {params}) => {
return {
    app: applist.apps.find(app => app.appId == params.appId),
    connectionUri: connectionStepper.connectionUri,
    connectionType: connectionStepper.connectionType,
    connectionName: connectionStepper.connectionName,
    isActive: connectionStepper.isActive
}}

export default connect(
    mapStateToProps,
    {...connectionStepperActions, ...connectionActions, ...appListActions}
)(ConnectionAddStepperContainer)
