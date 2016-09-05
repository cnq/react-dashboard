import React, { Component } from 'react'
import { Home } from 'views';

/**
 * HomeContainer() wraps everything in the Home view.
 **/
class HomeContainer extends Component {
    render () {
        return (
            <Home props={this.props} />
        )
    }
}

export default HomeContainer
