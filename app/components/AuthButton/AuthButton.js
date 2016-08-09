import React, { PropTypes } from 'react'
import { getProviderInfo } from 'helpers/utils'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {
    FACEBOOK,
    GOOGLE,
    GITHUB,
    TWITTER,
    EMAIL
} from 'config/constants'
import { buttonContainer } from 'shared/styles.css'

const styles = {
    button: {},
    label: {
        textTransform: 'capitalize'
    },
    icon: {}
}

const {
    func,
    string
} = PropTypes

/**
 * AuthButton() returns a styled button for a
 * federated authentication provider.
 */
AuthButton.propTypes = {
    onAuth: func.isRequired,
    authProvider: string.isRequired
}

function AuthButton ({ onAuth, authProvider }) {

    const name = getProviderInfo(authProvider).name
    const icon = getProviderInfo(authProvider).icon
    const color = getProviderInfo(authProvider).color
    
    return (
        <RaisedButton
            className={buttonContainer}
            label={name}
            labelStyle={styles.label}
            labelColor="#ffffff"
            backgroundColor={color}
            onTouchTap={authProvider != EMAIL ? (event) => onAuth(authProvider, event) : undefined}
            icon={<FontIcon className={`fa fa-${icon} fa-3x`} style={styles.icon} />}
            style={styles.button}
        />
    )
}

export default AuthButton
