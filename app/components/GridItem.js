import React from 'react'
import s from './Grid.css'

function GridItem (props) {
    return (
        <div className={s.gridItem}>
            {props.children}
        </div>
    )
}

export default GridItem
