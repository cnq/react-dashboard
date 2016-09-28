import React, { Component } from 'react';
import { AppCardAdd } from 'components'
import { connect } from 'react-redux'
import { app as appActions } from 'actions'

class AppCardAddContainer extends Component {

    handleCreateApp = (backendSiteUri) => {
        this.props.createApp(backendSiteUri)
    }

        render () {
            return (
                <AppCardAdd createApp={this.handleCreateApp} isCreating={this.props.isCreating}/>)
    }
}

const mapStateToProps = ({app}) => ({
    backendSiteUri: app.backendSiteUri,
    isCreating: app.isCreating
})


export default connect(mapStateToProps,{...appActions})(AppCardAddContainer)