import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { SigninForm, LoadingIndicator } from 'components'
import { signin as signinActions } from 'actions'
import s from './SigninContainer.css'
import { centeredContainer } from '../styles.css'

const Signin = React.createClass({
    render() {
        return (
            <div className={centeredContainer}>{this.props.children}</div>
        )
    }
})

class SigninContainer extends Component {
    propTypes : {
        isAuthenticating: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        fetchAndHandleAuthenticatedUser: PropTypes.func
    }
    handleAuth = (event) => {
        this.props.signIn(event)
    }

    componentWillMount() {
        this.props.initializeSignin()
    }

    componentDidUpdate() {
        if(this.props.isAuthenticated){
            if (this.props.location.state && this.props.location.state.nextPathname) {
                this.props.router.replace(this.props.location.state.nextPathname)
            } else {
                this.props.router.replace('/dashboard/apps')
            }
        }
    }

    login = (props, handleAuth) => {
        return (
            <div>
                <SigninForm formError={props.error} onSubmit={handleAuth} />
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


const mapStateToProps = ({signin}) => ({
    isAuthenticating: signin.isAuthenticating,
    isAuthenticated: signin.isAuthenticated,
    error: signin.error
})

export default withRouter(connect(
    mapStateToProps,
    signinActions
)(SigninContainer))
