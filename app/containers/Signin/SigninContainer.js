import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { SocialSignin } from 'components'
import { users as actions } from 'actions';
import { formatAuthData } from 'helpers/utils'

const SigninContainer = React.createClass({
    propTypes: {
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        fetchAndHandleAuthenticatedUser: PropTypes.func.isRequired
    },
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    handleAuth (authProvider, event) {
        event.preventDefault()
        const authData = formatAuthData(authProvider)
        this.props.fetchAndHandleAuthenticatedUser(authData)
            .then(() => {
                this.context.router.replace('dashboard')
            })
    },
    render () {
        return (
            <div>
                <SocialSignin
                    isFetching={this.props.isFetching}
                    error={this.props.error}
                    onAuth={this.handleAuth}
                />
            </div>
        )
    }
})

function mapStateToProps ({users}) {
    return {
        isFetching: users.isFetching,
        error: users.error
    }
}

export default connect(mapStateToProps, actions)(SigninContainer);