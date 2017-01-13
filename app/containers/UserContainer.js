import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { User } from 'components'
import { userActions as actions } from 'actions'

class UserContainer extends Component {

    deleteUser = (user) => {
        this.props.userDeleteInitialize(user)
    }
    updateUserRole = (user) => {
        this.props.userChangeRolesInitialize(user)
    }

    render () {
        return (
            <User deleteUser={this.deleteUser} handleRoleChange={this.updateUserRole} user={this.props.user} isAuthenticatedUserAnAdmin={this.props.isAuthenticatedUserAnAdmin} isUserTheAuthenticatedUser={this.props.isUserTheAuthenticatedUser}/>
        )
    }

}

UserContainer.propTypes = {
    user: PropTypes.object.isRequired,
    isUserTheAuthenticatedUser: PropTypes.bool.isRequired,
    isAuthenticatedUserAnAdmin: PropTypes.bool.isRequired,
    userDeleteInitialize: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({})

export default withRouter(connect(mapStateToProps, actions)(UserContainer))
