import React, { PropTypes } from 'react'
import { AppCard } from 'components'
import { formatApp } from 'helpers/utils'
import {
    newAppTop,
    pointer,
    newAppInputContainer,
    newAppInput,
    darkBtn,
    submitAppBtn
} from './styles.css'

const activeStyles = {
    content: {
        width: 350,
        margin: '0px auto',
        height: 220,
        borderRadius: 5,
        background: '#FFF',
        padding: 0
    }
}

const deactiveStyles = {
    content: {
        width: 350,
        margin: '0px auto',
        height: 220,
        borderRadius: 5,
        background: '#EBEBEB',
        padding: 0
    }
}

const {
    object,
    string,
    func,
    bool
} = PropTypes

/**
 * AddApp() returns component that displays necessary
 * input fields for adding new apps.
 */
AddApp.propTypes = {
    appDomain: string.isRequired,
    isActive: bool.isRequired,
    user: object.isRequired,
    isSubmitDisabled: bool.isRequired,
    activateAddApp: func.isRequired,
    deactivateAddApp: func.isRequired,
    updateAppDomain: func.isRequired,
    appFanout: func.isRequired
}

function AddApp(props) {

    const onClickCreateApp = ()  => {
        props.appFanout(formatApp(props.appDomain, props.user))
    }

    const renderActions = ({ isActive, isSubmitDisabled }) => {
        return (
            <button
                className={submitAppBtn}
                style={isActive ? activeStyles : deactiveStyles}
                disabled={isSubmitDisabled}
                onClick={onClickCreateApp}
            >
                {'Create App'}
            </button>
        )
    }

    return (
        <AppCard
            title="Create New App"
            backendSiteUri=""
            actions={renderActions(props)}
            onClick={props.activateAddApp}
        >
            <div className={newAppInputContainer}>
                <input
                    className={newAppInput}
                    value={props.appDomain}
                    maxLength={140}
                    type='text'
                    placeholder={`Enter your website url`}
                    onChange={(event) => props.updateAppDomain(event.target.value)}
                />
            </div>
        </AppCard>
    )
}

export default AddApp 
