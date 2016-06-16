import React from 'react'
import { text } from './styles.css'

export default ({ children }) => {
    return (
        <div>
            <h1 className={text}>{'You are now logged out'}</h1>
            {children}
        </div>
    )
}
