import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { UserSetupForm, LoadingIndicator } from 'components'
import { userActions, signin } from 'actions'
import s from './FormContainer.css'
import { centeredContainer } from '../styles.css'

class UserSetupContainer extends Component {
    propTypes : {
        user: PropTypes.object.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isSettingUp: PropTypes.bool.isRequired,
        isSetupComplete: PropTypes.bool.isRequired,
        failed: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired
    }
    handleFormSubmit = (event) => {
        //send for data
        this.props.userSetupInitialize({user: this.props.user, password: event.password, code: this.props.location.query.code})
    }

   componentWillMount(nextProps) {
        if(!this.props.user){
            this.props.router.push(`/activate?code=${this.props.location.query.code}`)
        }
    }

    componentDidUpdate() {
        if(this.props.isSetupComplete && this.props.isAuthenticated){
            this.props.router.replace('/dashboard/apps')
        }
    }

    form = (props, handleFormSubmit) => {
        return (
            <div>
                {props.user ? <UserSetupForm user={props.user} formError={props.error} onSubmit={handleFormSubmit} /> : null}
            </div>
        )
    }

    render () {
        return ( 
            
                <div className={centeredContainer}>
                   { this.props.failed ? 
                        <div>
                            <h2>There is something wrong with that link...</h2>
                            <h2>Go <a href="/forgot">here</a> to request a new one</h2> 
                        </div>
                        : 
                        <Paper className={s.paper} zDepth={2}>
                            <Card>
                                <CardHeader title="Set your password"/>
                                <CardText className={s.cardText}>
                                    {
                                         this.props.isAuthenticating || this.props.isSettingUp || this.props.isSetupComplete  ?   <LoadingIndicator size={2} /> : this.form(this.props, this.handleFormSubmit)
                                    }
                                </CardText>
                                <CardText className={`${s.footnote} ${s.cardText}`}>
                                    <p>{`By completing the account setup process, you agree to Paperhook's`} <br /> <a target="_blank" href="/terms-of-use">{`Terms of Use`}</a> {`and`} <a target="_blank" href="/privacy-policy">{`Privacy Policy.`}</a></p>
                                </CardText>
                            </Card>
                        </Paper>
                    }
                </div>
            )
    }
}


const mapStateToProps = ({activateUser, setupUser, signin}) => {
    return {
        user: activateUser.user,
        isAuthenticating: signin.isAuthenticating,
        isAuthenticated: signin.isAuthenticated,
        isSettingUp: setupUser.isSettingUp,
        isSetupComplete: setupUser.isSetupComplete,
        failed: setupUser.failed,
        error: signin.error
    }
}

export default withRouter(connect(mapStateToProps,{...userActions,signin})(UserSetupContainer))
