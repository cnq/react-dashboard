import React, { PropTypes } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { customTheme } from 'config/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MainContainer = React.createClass({
    propTypes: {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired
    },
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
})

const mapStateToProps = ({users}) => ({
    isAuthenticated: users.isAuthenticated,
    user: users[users.authenticatedId] ? users[users.authenticatedId].info : {}
})

export default connect(
    mapStateToProps
)(MainContainer)
