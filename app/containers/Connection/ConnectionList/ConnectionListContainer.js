import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List } from 'immutable'
import { ConnectionList } from 'components'
import {
    connectionList as connectionListActions
} from 'actions'

const {
    string,
    func,
    bool
} = PropTypes

/**
 * ConnectionListContainer() passes necessary state to the props of
 * the ConnectionList component.
 */
class ConnectionListContainer extends Component {

    componentWillMount () {
        this.props.handleConnectionListListener(this.props.params.appId, true) //Pass in appId and whether Listener should be on or off
    }

    componentWillUnmount () {
        this.props.handleConnectionListListener(this.props.params.appId, false) //Pass in appId and whether Listener should be on or off
    }

    goToAddAppConnections = (event) => {
        event.stopPropagation()
        this.props.router.push('/dashboard/apps/app/' + this.props.appId + '/connections/add')
    }

    render () {
        return (
            <ConnectionList
                connectionIds={this.props.connectionIds}
                appId={this.props.appId}
                goToAddAppConnections={this.goToAddAppConnections}
                error={this.props.error}
                isFetching={this.props.isFetching}
                connectionAlreadyFetched={false}
            />
        )
    }

}

ConnectionListContainer.propTypes = {
    isFetching: bool.isRequired,
    error: string.isRequired,
    appId: string.isRequired,
    connectionIds: PropTypes.instanceOf(List),
    handleConnectionListListener: func.isRequired
}

const mapStateToProps = ({connectionList}, {params}) => ({
    isFetching: connectionList.isFetching ? true : false,
    error: connectionList.error ? connectionList.error : '',
    appId: params.appId,
    connectionIds: connectionList.get('connectionIds')
})

export default withRouter(connect(
    mapStateToProps,
    {...connectionListActions}
)(ConnectionListContainer))
