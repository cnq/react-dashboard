import React from 'react'
import {
    centeredContainer
} from 'shared/styles.css'

export default ({ children }) => {
    return (
        <div className={centeredContainer}>
            {children}
        </div>
    )
}
