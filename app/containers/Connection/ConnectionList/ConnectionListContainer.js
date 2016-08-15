import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { connectionList as actions } from 'actions'
import { ConnectionList } from 'components'
import { List } from 'immutable'

const ConnectionListContainer = React.createClass({
    propTypes: {
        connectionIds: PropTypes.instanceOf(List),
        appId: PropTypes.string.isRequired,
        newConnectionsAvailable: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        setAndHandleConnectionListListener: PropTypes.func.isRequired,
        resetNewConnectionsAvailable: PropTypes.func.isRequired
    },
    componentDidMount () {
        this.props.setAndHandleConnectionListListener()
    },
    render () {
        return (
            <ConnectionList
                connectionIds={this.props.connectionIds}
                appId={this.props.appId}
                newConnectionsAvailable={this.props.newConnectionsAvailable}
                error={this.props.error}
                isFetching={this.props.isFetching}
                resetNewConnectionsAvailable={this.props.resetNewConnectionsAvailable}
            />
        )
    }
})

function mapStateToProps({connectionList}, props) {
    return {
        newConnectionsAvailable: connectionList.get('newConnectionsAvailable'),
        error: connectionList.get('error'),
        isFetching: connectionList.get('isFetching'),
        connectionIds: connectionList.get('connectionIds'),
        appId: props.params.appId
    }
}

export default connect(mapStateToProps, actions)(ConnectionListContainer)