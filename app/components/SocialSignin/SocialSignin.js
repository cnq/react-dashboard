import React, { PropTypes } from 'react'
import { v4 } from 'node-uuid'
import { AuthButton } from 'components'
import { getProviderInfo } from 'helpers/utils'
import {
    FACEBOOK,
    GOOGLE,
    GITHUB,
    TWITTER
} from 'config/constants'
import {
    centeredContainer,
    errorMsg
} from 'shared/styles.css'
import {
    socialButtonsList
} from './styles.css'

const {
    string,
    func,
    bool
} = PropTypes

SocialSignin.propTypes = {
    error: string.isRequired,
    onAuth: func.isRequired
}

function SocialSignin ({ onAuth, error }) {

    const renderSocialButtons = (onAuth) => {

        const providers = [
            FACEBOOK,
            GOOGLE,
            GITHUB,
            TWITTER
        ]

        return (
            providers.map( provider =>
                <li key={v4()}>
                    <AuthButton
                        key={v4()}
                        onAuth={onAuth}
                        authProvider={provider}
                    />
                </li>
            )
        )

    }

    return (
        <div className={centeredContainer}>
            <ul className={socialButtonsList}>{renderSocialButtons(onAuth)}</ul>
            {error ? <p className={errorMsg}>{'Oops! Well this is embarrassing, we had an issue getting you logged in. Please try again.'}</p> : null}
        </div>
    )

}

export default SocialSignin
