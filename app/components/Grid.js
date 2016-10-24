import React from 'react'
import s from './Grid.css'

export function GridCard (props) {
    return (
        <div className={s.gridCard}>
            {props.children}
        </div>
    )
}

export function GridList (props) {
    return (
        <div className={s.gridList}>
            {props.children}
        </div>
    )
}