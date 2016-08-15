import React from 'react'
import { text } from './styles.css'

export default ({children}) => {
    return (
        <div>
            <h1 className={text}>{'User Profile'}</h1>
            {children}
        </div>
    )
}
