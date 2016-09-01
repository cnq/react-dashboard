import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { appList as actions } from 'actions'
import { AppList } from 'components'
import { List } from 'immutable'

const AppListContainer = React.createClass({
    propTypes: {
        appIds: PropTypes.instanceOf(List),
        newAppsAvailable: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        setAndHandleAppListListener: PropTypes.func.isRequired,
        resetNewAppsAvailable: PropTypes.func.isRequired
    },
    componentDidMount () {
        this.props.setAndHandleAppListListener()
    },
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
})

const mapStateToProps = ({appList}) => ({
    newAppsAvailable: appList.get('newAppsAvailable'),
    error: appList.get('error'),
    isFetching: appList.get('isFetching'),
    appIds: appList.get('appIds')
})

export default connect(mapStateToProps, actions)(AppListContainer)