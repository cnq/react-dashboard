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

        propTypes: { isAuthenticated: PropTypes.bool, checkSigninComplete: PropTypes.bool  }

        componentWillReceiveProps(nextProps) {
            if(nextProps.checkSigninComplete && !nextProps.isAuthenticated && !this.props.router.isActive('signin')){
                this.props.router.push('/signin')
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
        return { 
            checkSigninComplete: signin.checkSigninComplete,
            isAuthenticated: signin.isAuthenticated 
        }
    }

    return withRouter(connect( mapStateToProps, signinActions)(CheckAuthentication))
}


class MainContainer extends Component {
    propTypes : {
        checkSigninComplete: PropTypes.bool.isRequired,
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
        checkSigninComplete: ownProps.checkSigninComplete,
        isAuthenticated: ownProps.isAuthenticated,
        user: {}                                                                //TODO: user should retrieved as part of the auth flow and passed to the MainContainer 
    })
)(checkAuthHoc(MainContainer))
