import React, { PropTypes } from 'react'
import { AppConnectionContainer } from 'containers'
import {
    mainContainer,
    container,
    content
} from './styles.css'
import {
    subHeader,
    darkBtn,
    errorMsg
} from 'shared/styles.css'

const {
    string,
    bool
} = PropTypes

/**
 * AppDetails() returns app details component which displays
 * the settings for the currently selected app.
 */
// TODO: Only initial setup, refer to App Card for guidance.
AppConnectionDetails.propTypes = {
    appId: string.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired
}

function AppConnectionDetails ({ appId, isFetching, error }) {
    return (
        <div className={mainContainer}>
            {
                isFetching === true
                    ?   <p className={subHeader}>{'Fetching'}</p>
                    :   <div className={container}>
                            <div className={content}>
                                <AppConnectionContainer
                                    appId={appId}
                                />
                            </div>
                        </div>
            }
            {
                error
                    ?   <p className={errorMsg}>{error}</p>
                    :   null
            }
        </div>
    )
}

export default AppConnectionDetails
