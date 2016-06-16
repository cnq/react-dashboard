import React, { PropTypes } from 'react'
import {
    grid
} from './styles.css'

export default function Grid (props) {
    return (
        <div className={grid}>
            {props.children}
        </div>
    )
}