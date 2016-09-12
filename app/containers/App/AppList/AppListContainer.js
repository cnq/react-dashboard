import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { AppList } from 'components'
import {
    users as usersActions,
    appList as appListActions 
} from 'actions'

const {
    bool,
    string,
    func
} = PropTypes

/**
 * AppListContainer() passes state to the props of
 * the AppList component.
 **/
class AppListContainer extends Component {

    componentWillMount () {
        this.props.handleAppListListener(this.props.userId, true) //Pass in appId and whether Listener should be on or off
    }

    componentWillUnmount () {
        this.props.handleAppListListener(this.props.userId, false) //Pass in appId and whether Listener should be on or off
    }

    render () {
        return (
            <AppList
                appIds={this.props.appIds}
                newAppsAvailable={this.props.newAppsAvailable}
                error={this.props.error}
                isFetching={this.props.isFetching}
                resetNewAppsAvailable={this.props.resetNewAppsAvailable}
            />
        )
    }

}

AppListContainer.propTypes = {
    appIds: PropTypes.instanceOf(List),
    userId: string.isRequired,
    newAppsAvailable: bool.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    handleAppListListener: func.isRequired,
    resetNewAppsAvailable: func.isRequired
}

const mapStateToProps = ({users, appList}) => ({
    newAppsAvailable: appList.get('newAppsAvailable'),
    error: appList.get('error'),
    isFetching: appList.get('isFetching'),
    appIds: appList.get('appIds'),
    userId: users[users.authenticatedId] ? users[users.authenticatedId].info.uid : ''
})

export default connect(
    mapStateToProps,
    {...usersActions, ...appListActions}
)(AppListContainer)
