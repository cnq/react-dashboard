import React, { Component, PropTypes } from 'react'
import { ConnectionDetails } from 'components'
import { connect } from 'react-redux'
import { connections as actions } from 'actions'

const {
    string,
    bool,
    func
} = PropTypes

/**
 * ConnectionDetailsContainer() passes necessary state to the props of
 * the ConnectionDetails component.
 */
class ConnectionDetailsContainer extends Component {

    componentDidMount () {
        if (this.props.connectionAlreadyFetched === false) {
            this.props.fetchAndHandleConnection(this.props.connectionId)
        } else {
            this.props.removeConnectionFetching()
        }
    }

    render () {
        return (
            <ConnectionDetails
                connectionId={this.props.connectionId}
                appId={this.props.appId}
                isFetching={this.props.isFetching}
                error={this.props.error}
                connectionAlreadyFetched={this.props.connectionAlreadyFetched}
            />
        )
    }

}

ConnectionDetailsContainer.propTypes = {
    connectionId: string.isRequired,
    appId: string.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired,
    connectionAlreadyFetched: bool.isRequired,
    removeConnectionFetching: func.isRequired,
    fetchAndHandleConnection: func.isRequired
}

const mapStateToProps = ({connections}, {params}) => ({
    isFetching: connections.get('isFetching'),
    error: connections.get('error'),
    appId: connections.getIn([params.connectionId, 'appId']),
    connectionId: params.connectionId,
    connectionAlreadyFetched: !!connections.get(params.connectionId)
})

export default connect(
    mapStateToProps,
    actions
)(ConnectionDetailsContainer)
