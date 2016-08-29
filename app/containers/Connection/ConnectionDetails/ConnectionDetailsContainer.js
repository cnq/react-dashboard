import React, { PropTypes } from 'react'
import { ConnectionDetails } from 'components'
import { connect } from 'react-redux'
import { connections as actions } from 'actions'

const ConnectionDetailsContainer = React.createClass({
    propTypes: {
        connectionId: PropTypes.string.isRequired,
        appId: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        removeConnectionFetching: PropTypes.func.isRequired,
        fetchAndHandleConnection: PropTypes.func.isRequired
    },
    componentDidMount () {
        if (this.props.connectionAlreadyFetched === false) {
            this.props.fetchAndHandleConnection(this.props.connectionId)
        } else {
            this.props.removeConnectionFetching()
        }
    },
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
})

function mapStateToProps({connections}, props) {
    return {
        isFetching: connections.get('isFetching'),
        error: connections.get('error'),
        appId: connections.getIn([props.routeParams.connectionId, 'appId']),
        connectionId: props.routeParams.connectionId,
        connectionAlreadyFetched: !!connections.get(props.routeParams.connectionId)
    }
}

export default connect(
    mapStateToProps,
    actions
)(ConnectionDetailsContainer)
