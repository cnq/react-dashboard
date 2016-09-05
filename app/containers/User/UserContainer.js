import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { User } from 'components'
import { UserProfile } from 'views'
import { staleUser, staleApps } from 'helpers/utils'
import {
    users as usersActions,
    usersApps as usersAppsActions
} from 'actions'

const {
    bool,
    string,
    array,
    func,
    number
} = PropTypes

/**
 * UserContainer() passes state to the props of
 * the User component.
 **/
class UserContainer extends Component {

    componentDidMount () {
        const uid = this.props.routeParams.uid
        if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
            this.props.fetchAndHandleUser(uid)
        }
        if (this.props.noUser === true || staleApps(this.props.lastUpdatedApps)) {
            this.props.fetchAndHandleUsersApps(uid)
        }
    }

    render () {
        return (
            <UserProfile>
                <User
                    noUser={this.props.noUser}
                    name={this.props.name}
                    isFetching={this.props.isFetching}
                    error={this.props.error}
                    appIds={this.props.appIds}
                />
            </UserProfile>
        )
    }

}

UserContainer.propTypes = {
    noUser: bool.isRequired,
    name: string.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired,
    appIds: array.isRequired,
    fetchAndHandleUser: func.isRequired,
    fetchAndHandleUsersApps: func.isRequired,
    lastUpdatedUser: number.isRequired,
    lastUpdatedApps: number.isRequired
}

const mapStateToProps = ({users, usersApps}, props) => ({
    noUser: typeof users[props.routeParams.uid] === 'undefined', //noUser (true/false): check whether this user exists
    name: typeof users[props.routeParams.uid] === 'undefined' ? '' : users[props.routeParams.uid].info.name, //if user exists set name, otherwise set name to ''
    isFetching: users.isFetching || usersApps.isFetching ? true : false,
    error: users.error || usersApps.error,
    appIds: usersApps[props.routeParams.uid] ? usersApps[props.routeParams.uid].appIds : [], //assign this user's apps to appIds
    lastUpdatedUser: users[props.routeParams.uid] ? users[props.routeParams.uid].lastUpdated : 0,
    lastUpdatedApps: usersApps[props.routeParams.uid] ? usersApps[props.routeParams.uid].lastUpdated : 0
})

export default connect(
    mapStateToProps,
    {...usersActions, ...usersAppsActions}
)(UserContainer)
