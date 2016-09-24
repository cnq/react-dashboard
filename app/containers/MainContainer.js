import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { signin as signinActions } from 'actions'
import s from './MainContainer.css'
import { customTheme } from 'config/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const { bool, object } = PropTypes

function checkAuthHoc(WrappedComponent) {

    class CheckAuthentication extends Component {

        propTypes: { isAuthenticated: PropTypes.object }

        componentWillMount() {
            console.log('CheckAuthentication - componentWillMount() called');
            this.props.checkSigninStart(false) //assume that the user is not authenticated on initial load and kick off checkSigninStart action 
        }
        componentWillReceiveProps(nextProps) {
            console.log('CheckAuthentication - componentDidUpdate() called');
            if(!nextProps.isAuthenticated && !this.props.router.isActive('signin')){
                console.log('CheckAuthentication - user is not authenticated');
                this.props.router.push('/signin')
            } else {
                console.log('CheckAuthentication - user is authenticated');
            }
        }

        //componentWillMount() {
        //    console.log('CheckAuthentication - componentWillMount() called');
        //    const isAuthed = this.handleAuthCheck()

        //    if (!isAuthed && this.props.router.isActive('dashboard')) {
        //        this.props.router.push('/signin')
        //    }
        //}

        //componentWillReceiveProps(nextProps) {
        //    const isAuthed = this.handleAuthCheck(nextProps.isAuthenticated)
        //    const nextRouter = nextProps.router
        //    const { router } = this.props

        //    if(isAuthed) {
        //        if (!nextProps.isAuthenticated) {
        //            router.push('/signout')
        //        } else if (nextRouter.isActive('signin')) {
        //            router.push('/dashboard/apps')
        //        }
        //    } else if (nextRouter.isActive('dashboard')) {
        //        router.push('/signin')
        //    }
        //}

        //handleAuthCheck (nextIsAuthenticated) {
        //    console.log('CheckAuthentication - handleAuthCheck() called');
        //    const { isAuthenticated } = this.props
        //    this.props.checkSigninStart()
        //}

        render() {
            return (
                <div>
                    { !this.props.isAuthenticated && this.props.authRequired ? null : <WrappedComponent { ...this.props } /> }
                </div>
            )
                    }

    }
    function mapStateToProps({signin}) { 
        return { isAuthenticated: signin.isAuthenticated }
    }

return withRouter(connect( mapStateToProps, signinActions)(CheckAuthentication))
}


class MainContainer extends Component {
    render () {
        return (
            <MuiThemeProvider muiTheme={customTheme}>
                <div className={ s.container }>
                    <Navigation isAuthenticated={this.props.isAuthenticated} user={this.props.user}/>
                    <div className={ s.innerContainer }>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

MainContainer.propTypes = {
    isAuthenticated: bool.isRequired,
    user: object.isRequired
}

export default connect(
    (state, ownProps) => ({
        isAuthenticated: ownProps.isAuthenticated,
        user: {}                                                                //TODO: user should retrieved as part of the auth flow and passed to the MainContainer 
    })
)(checkAuthHoc(MainContainer))
