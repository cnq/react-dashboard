import React from 'react'
import { Home } from 'views';

const HomeContainer = React.createClass({
    render () {
        return (
            <Home props={this.props} />
        )
    }
})

export default HomeContainer