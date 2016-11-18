import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import { UserCard } from 'components'
import s from './UserCardAdd.css'



class UserCardAdd extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            localEmailTextFiledValue: ''
        }
    }

    handleTextFieldChange = (event) => {
        this.setState({localEmailTextFiledValue: event.target.value})
    }

    onClickCreateUser = ()  => {
            console.log("UserCardAdd - onClickCreateUser()")
            this.props.createUser({email: this.state.localEmailTextFiledValue});
            this.setState({localEmailTextFiledValue: ''})
    }

    render () {

        return (
            <div>
                <div className={s.newUserInputContainer}>
                    <TextField
                        maxLength={140}
                        value = {this.state.localEmailTextFiledValue}
                        type="text"
                        floatingLabelText={`Email Address`}
                        hintText={`Provide the user's email address`}
                        onChange={this.handleTextFieldChange}
                    />
                </div>
                <FlatButton className={this.props.isActive ? s.enabled : s.disabled} primary={true} onTouchTap={this.onClickCreateUser}>{'Add New User'}</FlatButton>
            </div>
        )

    }

    }

        UserCardAdd.propTypes = {
            createUser: PropTypes.func.isRequired
        }

export default UserCardAdd 
