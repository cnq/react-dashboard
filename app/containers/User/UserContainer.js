import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { User } from 'components'
import { staleUser, staleApps } from 'helpers/utils'
import {
    users as usersActions,
    usersApps as usersAppsActions
} from 'actions'

const UserContainer = React.createClass({

    propTypes: {
        noUser: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        appIds: PropTypes.array.isRequired,
        fetchAndHandleUser: PropTypes.func.isRequired,
        fetchAndHandleUsersApps: PropTypes.func.isRequired,
        lastUpdatedUser: PropTypes.number.isRequired,
        lastUpdatedApps: PropTypes.number.isRequired
    },
    componentDidMount () {
        const uid = this.props.routeParams.uid
        if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
            this.props.fetchAndHandleUser(uid)
        }
        if (this.props.noUser === true || staleApps(this.props.lastUpdatedApps)) {
            this.props.fetchAndHandleUsersApps(uid)
        }
    },
    render () {
        return (
            <User
                noUser={this.props.noUser}
                name={this.props.name}
                isFetching={this.props.isFetching}
                error={this.props.error}
                appIds={this.props.appIds}
            />
        )
    }

})

function mapStateToProps ({users, usersApps}, props) {
    const specificUsersApps = usersApps[props.routeParams.uid]
    const user = users[props.routeParams.uid]
    const noUser = typeof user === 'undefined'
    return {
        noUser,
        name: noUser ? '' : user.info.name,
        isFetching: users.isFetching || usersApps.isFetching ? true : false,
        error: users.error || usersApps.error,
        appIds: specificUsersApps ? specificUsersApps.appIds : [],
        lastUpdatedUser: user ? user.lastUpdated : 0,
        lastUpdatedApps: specificUsersApps ? specificUsersApps.lastUpdated : 0
    }
}

export default connect(
    mapStateToProps,
    {...usersActions, ...usersAppsActions}
)(UserContainer)