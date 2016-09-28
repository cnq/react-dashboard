import React, { Component } from 'react';
import { AppCardAdd } from 'components'
import { connect } from 'react-redux'
import { app as appActions } from 'actions'

class AppCardAddContainer extends Component {

    handleCreateApp = (event) => {
        this.props.createApp(event)
    }

    render () {
        return (
            <AppCardAdd props={this.props}>
                {this.props.children}
            </AppCardAdd>)
    }
    }


export default connect({...appActions})(AppCardAddContainer)