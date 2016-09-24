import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import auth from '../auth';


const Dashboard = React.createClass({
    
    render() {
        return (
            <div>
                    <div>
                <h1>Dashboard View</h1>
                <p>You made it!</p>
              </div>
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