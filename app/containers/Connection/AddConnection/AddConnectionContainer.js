import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import { AddConnection } from 'components'
import { connect } from 'react-redux'
import {
    addConnection as addConnectionActions,
    connections as connectionsActions,
    apps as appsActions
} from 'actions'

const { string } = PropTypes

const AddConnectionContainer = React.createClass({
    propTypes: {
        appId: PropTypes.string.isRequired
    },
    render () {
        return (
            <AddConnection
                {...this.props}
            />
        )
    }
})

function mapStateToProps({addConnection, apps}, props) {
    return {
        app: apps.get(props.appId) ? apps.get(props.appId) : Map({}),
        connectionUri: addConnection.connectionUri,
        connectionType: addConnection.connectionType,
        connectionName: addConnection.connectionName,
        isActive: addConnection.isActive
    }
}

export default connect(
    mapStateToProps,
    {...addConnectionActions, ...connectionsActions, ...appsActions}
)(AddConnectionContainer)