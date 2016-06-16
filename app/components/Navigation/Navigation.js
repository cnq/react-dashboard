import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { SettingsDropdown } from 'components'
import {
    container,
    navContainer,
    link }
from './styles.css'


const { bool, object } = PropTypes

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
    isAuthenticated: bool.isRequired,
    isRestricted: bool.isRequired,
    user: object.isRequired
}

function NavLinks ({isAuthenticated, isRestricted, user}) {
    //Once we've added groups to the data model, then we can pass it into here
    // to display in place of dashboard.
    return (
        isAuthenticated && isRestricted
            ?   <ul>
                    <li><Link to='/dashboard' className={link}>{'Dashboard'}</Link></li>
                </ul>
            :   <ul>
                    <li><Link to='/' className={link}>{'Home'}</Link></li>
                </ul>
    )
}

function ActionLinks ({isAuthenticated, isRestricted, user}) {
    return (
        isAuthenticated && isRestricted
            ?   <ul>
                    <li><SettingsDropdown user={user} /></li>
                </ul>
            :   <ul>
                    <li><Link to='/signin' className={link}>{'Sign In'}</Link></li>
                </ul>
    )
}

export default function Navigation ({isAuthenticated, isRestricted, user}) {
    return (
        <div className={container}>
            <nav className={navContainer}>
                <NavLinks isAuthenticated={isAuthenticated} isRestricted={isRestricted} user={user} />
                <ActionLinks isAuthenticated={isAuthenticated} isRestricted={isRestricted} user={user}  />
            </nav>
        </div>
    )
}