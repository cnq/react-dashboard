import React, { PropTypes } from 'react'
import {
    grid
} from './styles.css'

/**
 * Grid() returns a grid wrapper component for managing
 * app card layout within the app list.
 */
function Grid (props) {
    return (
        <div className={grid}>
            {props.children}
        </div>
    )
}

export default Grid
