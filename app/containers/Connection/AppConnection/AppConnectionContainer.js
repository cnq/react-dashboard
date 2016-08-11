import React, { PropTypes } from 'react'
import { AddConnection } from 'components'
import { connect } from 'react-redux'
import { connections as actions } from 'actions'

//TODO: Haven't started working through this one. Refer to AppContainer for guidance.
const ConnectionContainer = React.createClass({
    propTypes: {
        authenticatedUser: PropTypes.object.isRequired,
        appId: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        appAlreadyFetched: PropTypes.bool.isRequired,
        removeFetching: PropTypes.func.isRequired,
        fetchAndHandleApp: PropTypes.func.isRequired
    },
    componentDidMount () {
        if (this.props.appAlreadyFetched === false) {
            this.props.fetchAndHandleApp(this.props.appId)
        } else {
            this.props.removeFetching()
        }
    },
    render () {
        return (
            <AddConnection
                authenticatedUser = {this.props.authenticatedUser}
                appId = {this.props.appId}
                isFetching = {this.props.isFetching}
                error = {this.props.error}
            />
        )
    }
})

function mapStateToProps({apps, users}, props) {
    return {
        isFetching: apps.get('isFetching'),
        error: apps.get('error'),
        authenticatedUser: users[users.authenticatedId].info,
        appId: props.routeParams.appId,
        appAlreadyFetched: !!apps.get(props.routeParams.appId)
    }
}

export default connect(
    mapStateToProps,
    actions
)(ConnectionContainer)