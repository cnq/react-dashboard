import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { SocialSignin, FormSignin, LoadingIndicator } from 'components'
import { Signin } from 'views'
import { users as usersActions } from 'actions'
import { formatAuthData } from 'helpers/utils'
import {
    EMAIL
} from 'config/constants'
import { paper, cardText, divider, footnote } from './styles.css'

const {
    bool,
    string,
    func
} = PropTypes

/**
 * SigninContainer() returns component that displays necessary
 * input fields for signing into the app.
 */
class SigninContainer extends Component {

    handleAuth = (authProvider, event) => {
        var authData
        if(authProvider === EMAIL){
            authData = formatAuthData(authProvider, event.email, event.password)
        }else{
            authData = formatAuthData(authProvider)
        }
        this.props.fetchAndHandleAuthenticatedUser(authData)
            .then(() => {
                this.props.router.replace('/dashboard/apps/')
            })
    }

    socialAuthButtons = (props, handleAuth) => {
        // Are we in production?
        if (process.env.NODE_ENV !== 'production') {
            return (
                <div>
                    <div className={divider}>– or –</div>
                    <SocialSignin
                        isFetching={props.isFetching}
                        error={props.error}
                        onAuth={handleAuth}
                    />
                </div>
            )
        }
    }

    login = (props, handleAuth) => {
        return (
            <div>
                <FormSignin
                    isFetching={props.isFetching}
                    formError={props.error}
                    onSubmit={handleAuth}
                />
                {this.socialAuthButtons(props, handleAuth)}
            </div>
        )
    }

    render () {
        return ( 
            <Signin props={this.props}>
                <Paper className={paper} zDepth={2}>
                    <Card>
                        <CardHeader
                            title="Nice to see you again!"
                            subtitle="Login to get started"
                        />
                        <CardText className={cardText}>
                            {
                                this.props.isAuthenticating
                                    ?   <LoadingIndicator
                                            size={2}
                                        />
                                    :   this.login(this.props, this.handleAuth)
                            }
                        </CardText>
                        <CardText className={`${footnote} ${cardText}`}>
                            <p>{`By logging in, you agree to Paperhook's`} <br /> <a target="_blank" href="/terms-of-use">{`Terms of Use`}</a> {`and`} <a target="_blank" href="/privacy-policy">{`Privacy Policy.`}</a></p>
                        </CardText>
                    </Card>
                </Paper>
            </Signin>
        )
    }
}

SigninContainer.propTypes = {
    isFetching: bool.isRequired,
    error: string.isRequired,
    fetchAndHandleAuthenticatedUser: func.isRequired
}

const mapStateToProps = ({users}) => ({
    isFetching: users.isFetching,
    isAuthenticating: users.isAuthenticating,
    error: users.error
})

export default withRouter(connect(
    mapStateToProps,
    usersActions
)(SigninContainer))