import React from 'react'
import s from './Home.css'

export default ({ children }) => {
    return (
        <div className={s.container}>
            <h1 className={s.title}>{'Paperhook'}</h1>
            <p>{'The fastest, easiest way to connect and edit content on the web.'}</p>
{children}
</div>
    )
}
