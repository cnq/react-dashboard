import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { feed as actions } from 'actions'
import { Feed } from 'components'
import { List } from 'immutable'

const FeedContainer = React.createClass({
    propTypes: {
        appIds: PropTypes.instanceOf(List),
        newAppsAvailable: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        setAndHandleFeedListener: PropTypes.func.isRequired,
        resetNewAppsAvailable: PropTypes.func.isRequired
    },
    componentDidMount () {
        this.props.setAndHandleFeedListener()
    },
    render () {
        return (
            <Feed
                appIds={this.props.appIds}
                newAppsAvailable={this.props.newAppsAvailable}
                error={this.props.error}
                isFetching={this.props.isFetching}
                resetNewAppsAvailable={this.props.resetNewAppsAvailable}
            />
        )
    }
})

function mapStateToProps({feed}) {

    /* the immutable way */
    return {
        newAppsAvailable: feed.get('newAppsAvailable'),
        error: feed.get('error'),
        isFetching: feed.get('isFetching'),
        appIds: feed.get('appIds')
    }

    /* The vanilla way:
        const { newAppsAvailable, error, isFetching, appIds } = feed

        return {
            newAppsAvailable,
            error,
            isFetching,
            appIds
        }
    */

}

export default connect(mapStateToProps, actions)(FeedContainer)