import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { users as usersActions } from 'actions'
import { checkIfAuthenticated } from 'helpers/auth'

export default function (ComposedComponent) {

    class CheckAuthentication extends Component {

        propTypes: {
            isAuthenticated: PropTypes.object
        }

        componentWillMount() {

            const isAuthed = this.handleAuthCheck()
            const { router } = this.props

            if (!isAuthed && router.isActive('dashboard')) {
                router.push('/signin')
            }

        }

        componentWillReceiveProps(nextProps) {

            const isAuthed = this.handleAuthCheck(nextProps.isAuthenticated)
            const nextRouter = nextProps.router
            const { router } = this.props

            if(isAuthed) {
                if (!nextProps.isAuthenticated) {
                    router.push('/signout')
                } else {
                    if (nextRouter.isActive('signin')) {
                        router.push('/dashboard/apps')
                    }
                }
            } else {
                if (nextRouter.isActive('dashboard')) {
                    router.push('/signin')
                }
            }

        }

        handleAuthCheck (nextIsAuthenticated) {
            const { isAuthenticated } = this.props
            return checkIfAuthenticated(isAuthenticated, nextIsAuthenticated)
        }

        render() {
            return (
                <div>
                    {
                        !this.props.isAuthenticated && this.props.authRequired
                            ? null
                            : <ComposedComponent { ...this.props } />
                    }
                </div>
            )

        }

    }

    function mapStateToProps({users}) {
        return {
            isAuthenticated: users.isAuthenticated
        }
    }

    return withRouter(connect(
        mapStateToProps,
        usersActions
    )(CheckAuthentication))

}

