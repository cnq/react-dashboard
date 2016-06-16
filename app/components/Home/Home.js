import React from 'react'
import {
    container,
    title,
    slogan
} from './styles.css'

export default () => {
    return (
        <div className={container}>
            <p className={title}>{'Universal Dashboard'}</p>
            <p className={slogan}>{'a dashboard for any project including authentication via federated identity providers.'}</p>
        </div>
    )
}