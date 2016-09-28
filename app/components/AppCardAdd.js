import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import { AppCard } from 'components'
import s from './AppCardAdd.css'



class AppCardAdd extends Component {
    
    render () {

        const onClickCreateApp = ()  => {
            console.log("AppCardAdd - onClickCreateApp()")
        }

        const onClickAddApp = ()  => {
            console.log("AppCardAdd - onClickAddApp()")
        }

        const renderActions = ({ isActive, isSubmitDisabled }) => {
            return (
                <FlatButton className={isActive ? `enabled` : `disabled`} primary={true} disabled={isSubmitDisabled} onTouchTap={onClickCreateApp}>{'Create New Site'}</FlatButton>
            )
        }

    return (
        <AppCard title="Create New App"
            backendSiteUri=""
            uri=""
            actions={renderActions(this.props)}
            onClick={this.props.onClickAddApp}>
                <div className={s.newAppInputContainer}>
                    <TextField value={this.props.backendSiteUri}
                        maxLength={140}
                        type="text"
                        floatingLabelText={`Website URL`}
                        hintText={`Please enter your website URL`} />
                </div>
        </AppCard>
        )
    }

}

AppCardAdd.propTypes = {
    backendSiteUri: PropTypes.string.isRequired
}

export default AppCardAdd 
