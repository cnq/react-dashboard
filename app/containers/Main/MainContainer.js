import React, { Component, PropTypes } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { customTheme } from 'config/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const {
    bool,
    object
} = PropTypes

/**
 * MainContainer() establishes basic layout and passes state to the props of
 * the children components.
 **/
class MainContainer extends Component {
    render () {
        return (
            <MuiThemeProvider muiTheme={customTheme}>
                <div className={ container }>
                    <Navigation
                        isAuthenticated={this.props.isAuthenticated}
                        isRestricted={this.props.router.isActive('dashboard')}
                        user={this.props.user}
                    />
                    <div className={ innerContainer }>
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

const mapStateToProps = ({users}) => ({
    isAuthenticated: users.isAuthenticated,
    user: users[users.authenticatedId] ? users[users.authenticatedId].info : {}
})

export default connect(
    mapStateToProps
)(MainContainer)
