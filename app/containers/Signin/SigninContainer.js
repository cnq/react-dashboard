import React, { PropTypes } from 'react'
//import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
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
    handleAuth (authData, event) {
        event.preventDefault
        this.props.fetchAndHandleAuthenticatedUser(formatAuthData(authData))
            .then(() => {
                this.context.router.replace('dashboard')
            })
    },
    // TODO: add environment check here.
    render () {
        
        const { fields: { email, password }, handleSubmit } = this.props;
        console.log('error prop::::', this.props.error)
        return ( 
            <Signin props={this.props}>
                <FormSignin
                    handleSubmit={handleSubmit}
                    email={email}
                    password={password}
                    isFetching={this.props.isFetching}
                    error={this.props.error}
                    onAuth={this.handleAuth}
                />
                <br />
                <br />
                <SocialSignin
                    isFetching={this.props.isFetching}
                    error={this.props.error}
                    onAuth={this.handleAuth}
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

export default reduxForm({
    form: 'signin',
    fields: [ 'email', 'password']
},mapStateToProps, actions)(SigninContainer)
