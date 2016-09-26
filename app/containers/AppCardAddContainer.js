import React, { Component } from 'react';
import { AppCardAdd } from 'components'
import { connect } from 'react-redux'

class AppCardAddContainer extends Component {
    render () {
        return (
            <AppCardAdd props={this.props}>
                {this.props.children}
            </AppCardAdd>)
    }
    }


export default connect()(AppCardAddContainer)