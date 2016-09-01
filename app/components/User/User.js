import React, { PropTypes } from 'react'
import { v4 } from 'node-uuid'
import { userContainer, header } from './styles.css'
import { errorMsg } from 'shared/styles.css'
import { AppContainer } from 'containers'

User.propTypes = {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    appIds: PropTypes.array.isRequired
}

export default function User (props) {
    return (

        props.noUser === true
            ?   <p className={header}>{'This user does not exist'}</p>
            :   <div>
                    {
                        props.isFetching === true
                            ?   <p className={header}>{'Loading'}</p>
                            :   <div>
                                    <div className={userContainer}>
                                        <div>{props.name}</div>
                                    </div>
                                    {
                                        props.appIds.map((appId) => (
                                            <AppContainer appId={appId} key={v4()} />
                                        ))
                                    }
                                    {
                                        props.appIds.length === 0
                                            ?   <p className={header}>
                                                    {`It looks like ${props.name.split(' ')[0]} hasn't created any apps yet.`}
                                                </p>
                                            :   null
                                    }
                                </div>
                    }
                    {
                        props.error
                            ?   <p className={errorMsg}>{props.error}</p>
                            :   null
                    }
                </div>

    )
}