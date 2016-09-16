import React from 'react'
import {
    container,
    title
} from './styles.css'

export default ({ children }) => {
    return (
        <div className={container}>
            <h1 className={title}>{'Paperhook'}</h1>
            <p>{'The fastest, easiest way to connect and edit content on the web.'}</p>
            {children}
        </div>
    )
}
