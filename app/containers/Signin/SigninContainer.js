import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { SocialSignin, FormSignin } from 'components'
import { Signin } from 'views'
import { users as actions } from 'actions'
import { formatAuthData } from 'helpers/utils'
import {
    EMAIL
} from 'config/constants'
import { paper, divider } from './styles.css'


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
        event.preventDefault
        var authData
        if(authProvider.provider === EMAIL){
            authData = formatAuthData(authProvider, event.email, event.password)
        }else{
            authData = formatAuthData(authProvider)
        }
        this.props.fetchAndHandleAuthenticatedUser(authData)
            .then(() => {
                this.context.router.replace('dashboard')
            })
    },

    render () {

        const socialAuthButtons = (props, handleAuth) => {
            // Are we in production?
            if (process.env.NODE_ENV !== 'production') {
                return (
                    <div>
                        <Divider className={divider}/>
                        <SocialSignin
                            isFetching={props.isFetching}
                            error={props.error}
                            onAuth={handleAuth}
                        />
                    </div>
                )
            }
        }

        return ( 
            <Signin props={this.props}>
                <Paper className={paper} zDepth={2}>
                    <FormSignin
                        isFetching={this.props.isFetching}
                        formError={this.props.error}
                        onAuth={this.handleAuth}
                    />
                    {socialAuthButtons(this.props, this.handleAuth)}
                </Paper>
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
