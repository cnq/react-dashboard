import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import { AppCard } from 'components'
import s from './AppCardAdd.css'



class AppCardAdd extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            localBackendSiteUriTextFiledValue: ''
        }
    }

    handleTextFieldChange = (event) => {
        this.setState({localBackendSiteUriTextFiledValue: event.target.value})
    }

    onClickCreateApp = ()  => {
            console.log("AppCardAdd - onClickCreateApp()")
            this.props.createApp(this.state.localBackendSiteUriTextFiledValue);
            this.setState({localBackendSiteUriTextFiledValue: ''})
    }

    render () {

        const onClickAddApp = ()  => {
            console.log("AppCardAdd - onClickAddApp()")
        }


        return (
            <AppCard title="Create New App"
                backendSiteUri=""
                uri=""
            >
                <h4>Add A New Site</h4>
                <div className={s.newAppInputContainer}>
                    <TextField
                        maxLength={140}
                        value = {this.state.localBackendSiteUriTextFiledValue}
                        type="text"
                        floatingLabelText={`Website URL`}
                        hintText={`Please enter your website URL`}
                        onChange={this.handleTextFieldChange}
                    />
                </div>
                <FlatButton className={this.props.isActive ? s.enabled : s.disabled} primary={true} disabled={this.props.isCreating} onTouchTap={this.onClickCreateApp}>{'Add New Site'}</FlatButton>
            </AppCard>
        )

    }

    }

        AppCardAdd.propTypes = {
            createApp: PropTypes.func.isRequired,
            isCreating: PropTypes.bool.isRequired
        }

export default AppCardAdd 
