import React, { Component } from 'react';
import Home from 'views';


class HomeContainer extends Component {
    render () {
        return ( <Home props={this.props} /> )
    }
}

export default HomeContainer;