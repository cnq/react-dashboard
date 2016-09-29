import React, { PropTypes } from 'react'
import { ConnectionContainer } from 'containers'
import { subHeader, darkBtn, errorMsg } from '../styles.css'
import s from './ConnectionDetails'

function ConnectionDetails ({ connectionId, appId, isFetching, error, connectionAlreadyFetched }) {
    return (
        <div className={s.mainContainer}>
            {
                isFetching === true
                    ?   <div></div>
                    :   <div className={s.container}>
                            <div className={s.content}>
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

ConnectionDetails.propTypes = {
    connectionId: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    connectionAlreadyFetched: PropTypes.bool.isRequired
}

export default ConnectionDetails
