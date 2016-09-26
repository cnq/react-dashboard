import React from 'react'
import s from './Grid.css'

function Grid (props) {
    return (
        <div className={s.grid}>
            {props.children}
        </div>
    )
}

export default Grid