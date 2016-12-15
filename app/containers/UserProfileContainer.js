import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/RaisedButton';
import { User, DialogConfirm, UserChangePasswordForm } from 'components'
import { signin as signinActions, userActions} from 'actions'
import s from './UserProfileContainer.css'
import { centeredContainer, breathingRoom } from '../styles.css'

class UserProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserCreateDialog: false
        }
    }
    propTypes : {
        user: PropTypes.object.isRequired,
        error: PropTypes.bool.isRequired
    }

    openDialog = () => {
        this.setState({
            ... this.state,
                showDialog: true
        })
    }
    closeDialog = () => {
        this.setState({
            ... this.state,
                showDialog: false
        })
    }
    changePassword = (event) => {
        this.props.userChangePasswordInitialize({user: this.props.user, password: event.password, newPassword: event.newpassword})
    }
    render () {
        const renderChangePasswordDialog = (props) => {
            return ( <UserChangePasswordForm user={props.user} formError={props.error} onSubmit = {(event) => { this.closeDialog(); this.changePassword(event); } } /> )
        }
        return (
                <div className={centeredContainer}>
                    <div className={breathingRoom} style={{width: '100%'}}>
                          <h1 className={s.text}>{'User Profile'}</h1>
                    {this.props.user? 
                        <div>
                            <User user={this.props.user} /> 
                            <FlatButton onClick={this.openDialog} labelStyle={{color: '#f2f2f2', fontSize: '15px', letterSpacing: '.5px'}} backgroundColor="#3ED1D6" label="Change Password" />
                            <DialogConfirm title = "Change Password" message = {renderChangePasswordDialog(this.props)} isOpen = {this.state.showDialog} cancelCallback = {this.closeDialog} />
                        </div>
                     : null}
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state, {routeParams}) => {
    return{
        user: state.signin.user,
        error: state.userChangePassword.error
    }
}

export default connect( mapStateToProps, {...signinActions,...userActions} )(UserProfileContainer)
