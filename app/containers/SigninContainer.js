import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { SigninForm, LoadingIndicator } from 'components'
import { users as usersActions } from 'actions'
import { EMAIL } from 'config/constants'
import s from './SigninContainer.css'
import { centeredContainer } from '../styles.css'

const { bool, string, func } = PropTypes


const Signin = React.createClass({
    
    render() {
        return (
            <div className={centeredContainer}>
                {this.props.children}
            </div>
        )
    }
})

class SigninContainer extends Component {

    handleAuth = (authProvider, event) => {
        console.log('Login button clicked');
    }


    login = (props, handleAuth) => {
        return (
            <div>
                <SigninForm isFetching={props.isFetching} formError={props.error} onSubmit={handleAuth} />
            </div>
        )
    }

    render () {
        return ( 
            <Signin props={this.props}>
                <Paper className={s.paper} zDepth={2}>
                    <Card>
                        <CardHeader title="Nice to see you again!" subtitle="Login to get started" />
                        <CardText className={s.cardText}>
                            {
                                this.props.isAuthenticating
                                    ?   <LoadingIndicator size={2} />
                                    :   this.login(this.props, this.handleAuth)
                            }
                        </CardText>
                        <CardText className={`${s.footnote} ${s.cardText}`}>
                            <p>{`By logging in, you agree to Paperhook's`} <br /> <a target="_blank" href="/terms-of-use">{`Terms of Use`}</a> {`and`} <a target="_blank" href="/privacy-policy">{`Privacy Policy.`}</a></p>
                        </CardText>
                    </Card>
                </Paper>
            </Signin>
        )
     }
}

SigninContainer.propTypes = {
    isFetching: bool,
    error: string,
    fetchAndHandleAuthenticatedUser: func
}

export default withRouter(connect(
    (state) => ({
        isFetching: true,
        isAuthenticating: false,
        error: ""
    }),
    usersActions
)(SigninContainer))