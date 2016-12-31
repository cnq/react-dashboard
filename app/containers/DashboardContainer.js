import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


const Dashboard = React.createClass({
    
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})


class DashboardContainer extends Component {
    render () {
        return (
            <Dashboard props={this.props}>
                {this.props.children}
            </Dashboard>)
    }
}

export default connect()(DashboardContainer)