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
import { buttonContainer } from './styles.css'

const styles = {
    button: {},
    label: {
        textTransform: 'capitalize'
    },
    icon: {}
}

const {
    string,
    func,
    object
} = PropTypes

/**
 * AuthButton() returns a styled button for a
 * federated authentication provider.
 */
AuthButton.propTypes = {
    onAuth: func.isRequired,
    authData: object.isRequired
}

function AuthButton ({ onAuth, authData }) {

    const name = getProviderInfo(authData.provider).name
    const icon = getProviderInfo(authData.provider).icon
    const color = getProviderInfo(authData.provider).color

    return (
        <RaisedButton
            className={buttonContainer}
            label={name}
            labelStyle={styles.label}
            labelColor="#ffffff"
            backgroundColor={color}
            linkButton={true}
            onClick={(event) => onAuth(authData, event)}
            icon={<FontIcon className={`fa fa-${icon} fa-3x`} style={styles.icon} />}
            style={styles.button}
        />
    )
}

export default AuthButton
