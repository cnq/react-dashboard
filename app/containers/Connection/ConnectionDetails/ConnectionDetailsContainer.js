import React, { PropTypes } from 'react'
import { ConnectionDetails } from 'components'
import { connect } from 'react-redux'
import { connections as actions } from 'actions'

//TODO: Refer to AppContainer for guidance.
const ConnectionDetailsContainer = React.createClass({
    propTypes: {
        appId: PropTypes.string.isRequired,
        connectionId: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        connectionAlreadyFetched: PropTypes.bool.isRequired,
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
                appId = {this.props.appId}
                connectionId = {this.props.connectionId}
                isFetching = {this.props.isFetching}
                error = {this.props.error}
            />
        )
    }
})

function mapStateToProps({connections}, props) {
    return {
        isFetching: connections.get('isFetching'),
        error: connections.get('error'),
        appId: props.routeParams.appId,
        connectionId: props.routeParams.connectionId,
        connectionAlreadyFetched: !!connections.get(props.routeParams.connectionId)
    }
}

export default connect(
    mapStateToProps,
    actions
)(ConnectionDetailsContainer)