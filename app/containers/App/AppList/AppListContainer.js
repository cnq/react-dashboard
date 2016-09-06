import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { AppList } from 'components'
import { appList as actions } from 'actions'

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

    componentDidMount () {
        this.props.setAndHandleAppListListener()
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
    newAppsAvailable: bool.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    setAndHandleAppListListener: func.isRequired,
    resetNewAppsAvailable: func.isRequired
}

const mapStateToProps = ({appList}) => ({
    newAppsAvailable: appList.get('newAppsAvailable'),
    error: appList.get('error'),
    isFetching: appList.get('isFetching'),
    appIds: appList.get('appIds')
})

export default connect(
    mapStateToProps,
    actions
)(AppListContainer)
