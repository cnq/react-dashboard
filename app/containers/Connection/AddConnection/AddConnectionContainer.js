import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import { AddConnection } from 'components'
import { connect } from 'react-redux'
import {
    updateConnection as updateConnectionActions,
    connections as connectionsActions,
    apps as appsActions
} from 'actions'

const AddConnectionContainer = React.createClass({
    render () {
        return (
            <AddConnection
                {...this.props}
            />
        )
    }
})

const mapStateToProps = ({updateConnection, apps}, props) => ({
    app: apps.get(props.params.appId) ? apps.get(props.params.appId) : Map({}),
    connectionUri: updateConnection.connectionUri,
    connectionType: updateConnection.connectionType,
    connectionName: updateConnection.connectionName,
    isActive: updateConnection.isActive
})

export default connect(
    mapStateToProps,
    {...updateConnectionActions, ...connectionsActions, ...appsActions}
)(AddConnectionContainer)