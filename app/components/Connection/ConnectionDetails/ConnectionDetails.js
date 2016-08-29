import React, { PropTypes } from 'react'
import { ConnectionContainer } from 'containers'
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
 * ConnectionDetails() returns a connection details component which displays
 * the settings for the currently selected connection.
 */

ConnectionDetails.propTypes = {
    connectionId: string.isRequired,
    appId: string.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired,
    connectionAlreadyFetched: bool.isRequired
}

function ConnectionDetails ({ connectionId, appId, isFetching, error, connectionAlreadyFetched }) {
    return (
        <div className={mainContainer}>
            {
                isFetching === true
                    ?   <p className={subHeader}>{'Fetching'}</p>
                    :   <div className={container}>
                            <div className={content}>
                                <ConnectionContainer
                                    connectionId={connectionId}
                                    appId={appId}
                                    connectionAlreadyFetched={connectionAlreadyFetched}
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

export default ConnectionDetails
