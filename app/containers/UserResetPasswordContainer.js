import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { UserResetPasswordForm, LoadingIndicator } from 'components'
import { userActions } from 'actions'
import s from './FormContainer.css'
import { centeredContainer } from '../styles.css'

class UserResetPasswordContainer extends Component {
    propTypes : {
        isInProgress: PropTypes.bool.isRequired,
        isCompleteSuccessfully: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired
    }
    handleAuth = (event) => {
        this.props.userResetPasswordInitialize({email:event.email})
    }

    componentDidUpdate() {
        if(this.props.isCompleteSuccessfully){
            console.log('completed successfully, show message');
        }
    }

    render () {
        return ( 
                <div className={centeredContainer}>
                    <Paper className={s.paper} zDepth={2}>
                        <Card>
                            <CardHeader title="Reset your password" subtitle="We'll send you a reset link." />
                            <CardText className={s.cardText}>
                                {
                                    this.props.isInProgress
                                         ?   <LoadingIndicator size={2} />
                                         :   <div><UserResetPasswordForm formError={this.props.error} onSubmit={this.handleAuth} /></div>
                                }
                            </CardText>
                        </Card>
                    </Paper>
                </div>
            )
    }
}

const mapStateToProps = ({userResetPassword}) => ({
    isInProgress: userResetPassword.isInProgress,
    isCompleteSuccessfully: userResetPassword.isCompleteSuccessfully,
    error: userResetPassword.error
})

export default withRouter(connect(mapStateToProps,userActions)(UserResetPasswordContainer))
