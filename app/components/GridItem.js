import React from 'react'
import s from './Grid.css'

export function GridCardItem (props) {
    return (
        <div className={s.gridCardItem}>
            {props.children}
        </div>
    )
}

export function GridListItem (props) {
    return (
        <div className={s.gridListItem}>
            {props.children}
        </div>
    )
}