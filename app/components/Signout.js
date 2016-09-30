import React from 'react';
import auth from '../auth';

const Signout = React.createClass({
    componentDidMount() {
        auth.logout()
    },

    render() {
        return <p>You are now logged out</p>
    }
})


export default Signout