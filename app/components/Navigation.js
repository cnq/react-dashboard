import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { SettingsDropdown } from 'components'
import s from './Navigation.css'

NavLinks.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

function NavLinks ({isAuthenticated}) {
    return (
        isAuthenticated
            ?   <ul>
                    <li><Link to='/dashboard/apps' className={s.logo}>{'Paperhook'}</Link></li>
                </ul>
            :   <ul>
                    <li><Link to='/' className={s.link}>{'Home'}</Link></li>
                </ul>
    )
}

ActionLinks.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

function ActionLinks ({isAuthenticated, user}) {
    return (
        isAuthenticated
            ?   <ul>
                    <li><SettingsDropdown user={user} /></li>
                </ul>
            :   <ul>
                    <li><Link to='/signin' className={s.link}>{'Sign In'}</Link></li>
                </ul>
    )
}

Navigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

export default function Navigation ({isAuthenticated, user}) {
    return (
        <div className={s.container}>
            <nav className={s.navContainer}>
                <NavLinks isAuthenticated={isAuthenticated} />
                <ActionLinks isAuthenticated={isAuthenticated}  user={user}/>
            </nav>
        </div>
    )
}