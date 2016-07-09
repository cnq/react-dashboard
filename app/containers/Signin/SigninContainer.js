import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { SocialSignin, FormSignin } from 'components'
import { Signin } from 'views'
import { users as actions } from 'actions'
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
    handleFormAuth (authProvider, email, password) {
        console.debug("triggering login event");
        const authData = formatAuthData(authProvider, null, null, null, email, password)
        this.props.fetchAndHandleAuthenticatedUser(authData)
            .then(() => {
                this.context.router.replace('dashboard')
            })
    },
    render () {
        return ( 
            <Signin props={this.props}>
                <FormSignin
                    isFetching={this.props.isFetching}
                    error={this.props.error}
                    onAuth={this.handleFormAuth}
                /> 

            </Signin>
        )
    }
})

function mapStateToProps ({users}) {
    return {
        isFetching: users.isFetching,
        error: users.error
    }
}

export default connect(mapStateToProps, actions)(SigninContainer)
