import React from 'react'
import {
    container,
    title,
    slogan
} from './styles.css'

export default ({ children }) => {
    return (
        <div className={container}>
            <p className={title}>{'PaperHook'}</p>
            <p className={slogan}>{'Content, content everywhere and not a way to join it. Until now.'}</p>
            {children}
        </div>
    )
}

