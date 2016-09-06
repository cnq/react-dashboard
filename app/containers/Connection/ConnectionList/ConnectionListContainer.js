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
    number,
    func,
    array,
    bool
} = PropTypes

/**
 * ConnectionListContainer() passes necessary state to the props of
 * the ConnectionList component.
 */
class ConnectionListContainer extends Component {

    componentDidMount () {
        const appId = this.props.params.appId
        this.props.setAndHandleConnectionListListener(appId)
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
    setAndHandleConnectionListListener: func.isRequired
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
