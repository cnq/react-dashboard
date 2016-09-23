import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { SettingsDropdown } from 'components'
import { container, navContainer, link } from './Navigation.css'

const { bool, object } = PropTypes

NavLinks.propTypes = {
    isAuthenticated: bool.isRequired
}

function NavLinks ({isAuthenticated}) {
    return (
        isAuthenticated
            ?   <ul>
                    <li><Link to='/dashboard/apps' className={link}>{'Dashboard'}</Link></li>
                </ul>
            :   <ul>
                    <li><Link to='/' className={link}>{'Home'}</Link></li>
                </ul>
    )
}

ActionLinks.propTypes = {
    isAuthenticated: bool.isRequired,
    user: object.isRequired
}

function ActionLinks ({isAuthenticated, user}) {
    return (
        isAuthenticated
            ?   <ul>
                    <li><SettingsDropdown user={user} /></li>
                </ul>
            :   <ul>
                    <li><Link to='/signin' className={link}>{'Sign In'}</Link></li>
                </ul>
    )
}

Navigation.propTypes = {
    isAuthenticated: bool.isRequired,
    user: object.isRequired
}

export default function Navigation ({isAuthenticated, user}) {
    return (
        <div className={container}>
            <nav className={navContainer}>
                <NavLinks isAuthenticated={isAuthenticated} />
                <ActionLinks isAuthenticated={isAuthenticated}  user={user}/>
            </nav>
        </div>
    )
}