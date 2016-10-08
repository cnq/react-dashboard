import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { signin as signinActions } from 'actions'
import s from './MainContainer.css'
import { customTheme } from '../theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function checkAuthHoc(WrappedComponent) {

    class CheckAuthentication extends Component {

        propTypes: { isAuthenticated: PropTypes.object }

        componentWillMount() {
            console.log('CheckAuthentication - componentWillMount() called');
            this.props.checkSigninStart(false) //assume that the user is not authenticated on initial load and kick off checkSigninStart action 
        }
        componentWillReceiveProps(nextProps) {
            console.log('CheckAuthentication - componentWillReceiveProps() called');
            if(!nextProps.isAuthenticated && !this.props.router.isActive('signin')){
                console.log('CheckAuthentication - user is not authenticated');
                this.props.router.push('/signin')
            } else if(nextProps.isAuthenticated) {
                console.log('CheckAuthentication - user is authenticated');
            }
        }

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
    propTypes : {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired
    }
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

export default connect(
    (state, ownProps) => ({
        isAuthenticated: ownProps.isAuthenticated,
        user: {}                                                                //TODO: user should retrieved as part of the auth flow and passed to the MainContainer 
    })
)(checkAuthHoc(MainContainer))
