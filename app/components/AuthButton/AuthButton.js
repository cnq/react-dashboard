import React, { PropTypes } from 'react'
import { getProviderInfo } from 'helpers/utils'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {
    FACEBOOK,
    GOOGLE,
    GITHUB,
    TWITTER
} from 'config/constants'
import { buttonContainer } from './styles.css'

const styles = {
    button: {
    },
    label: {
        textTransform: 'capitalize'
    },
    icon: {
    }

}

const {
    string,
    func
} = PropTypes

AuthButton.propTypes = {
    onAuth: func.isRequired,
    authProvider: string.isRequired
}

function AuthButton ({ onAuth, authProvider }) {

    const providerInfo = getProviderInfo(authProvider)
    const name = providerInfo.name
    const icon = providerInfo.icon
    const color = providerInfo.color

    return (
        <RaisedButton
            className={buttonContainer}
            label={name}
            labelStyle={styles.label}
            labelColor="#ffffff"
            backgroundColor={color}
            linkButton={true}
            onClick={(event) => onAuth(authProvider, event)}
            icon={<FontIcon className={`fa fa-${icon} fa-3x`} style={styles.icon} />}
            style={styles.button}
        />
    )
}

export default AuthButton