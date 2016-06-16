import React, { PropTypes } from 'react'
import {
    gridItem
} from './styles.css'

export default function GridItem (props) {
    return (
        <div className={gridItem}>
            {props.children}
        </div>
    )
}