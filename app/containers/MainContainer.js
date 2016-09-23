import React, { Component, PropTypes } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import s from './MainContainer.css'
import { customTheme } from 'config/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const { bool, object } = PropTypes

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
)(MainContainer)
