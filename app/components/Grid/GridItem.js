import React, { PropTypes } from 'react'
import {
    gridItem
} from './styles.css'

/**
 * GridItem() returns grid items for managing
 * app card layout within the feed.
 */
export default function GridItem (props) {
    return (
        <div className={gridItem}>
            {props.children}
        </div>
    )
}

export default GridItem
