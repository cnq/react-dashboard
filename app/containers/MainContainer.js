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

        propTypes: { 
            isAuthenticated: PropTypes.bool, 
            checkSigninComplete: PropTypes.bool, 
            user: PropTypes.object 
        }

       

        componentWillReceiveProps(nextProps) {
            if(!nextProps.checkSigninComplete) return; //only do redirections once signin check has been completed

            const unprotected = ["/signin" ,"/activate", "/user-setup", "/forgot"]

            //if the user is not authenticated ...
            if(nextProps.isAuthenticated){

                if(this.props.location.pathname == "/" || this.props.location.pathname == "/dashboard" || this.props.location.pathname == "/dashboard/"){
                    this.props.router.replace('/dashboard/apps')
                }
                //if the user is authenticated and they are requesting an unprotected page, push to dashboard landing page
                else if(unprotected.indexOf(this.props.location.pathname) >= 0)
                {
                    this.props.router.push('/dashboard/apps')
                }
            
            } 
            else //if the user is not authenticated ...
            { 
                //if the user is not authenticated and they are requesting something other than unprotected, push them to signin
                if(unprotected.indexOf(this.props.location.pathname) < 0)
                {
                    this.props.router.push('/signin')
                }
                //if activate is requested, but no code is supplied, push to signin
                else if (this.props.location.pathname == "/activate"  && !this.props.location.query.code){
                    this.props.router.push('/signin')
                }
                //if setup is requested, but no code is supplied, push to signin
                else if (this.props.location.pathname == "/user-setup"  && !this.props.location.query.code){
                    this.props.router.push('/signin')
                }
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
            isAuthenticated: signin.isAuthenticated,
            user: signin.user 
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
    (state, ownProps) => {
        return {
            checkSigninComplete: ownProps.checkSigninComplete,
            isAuthenticated: ownProps.isAuthenticated,
            user: ownProps.user
        }
    }
)(checkAuthHoc(MainContainer))
