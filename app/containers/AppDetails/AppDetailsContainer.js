import React, { PropTypes } from 'react'
import { AppDetails } from 'components'
import { connect } from 'react-redux'
import { apps as actions } from 'actions'

const AppDetailsContainer = React.createClass({
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
            <AppDetails
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
)(AppDetailsContainer)