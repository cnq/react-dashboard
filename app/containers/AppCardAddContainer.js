import React, { Component } from 'react';
import { AppCardAdd } from 'components'
import { connect } from 'react-redux'
import { appActions } from 'actions'

class AppCardAddContainer extends Component {

    handleCreateApp = (backendSiteUri) => {
        this.props.createApp(backendSiteUri)
    }

        render () {
            return (
                <AppCardAdd createApp={this.handleCreateApp} isCreating={this.props.isCreating}/>)
    }
}

const mapStateToProps = ({addApp}) => ({
    backendSiteUri: addApp.backendSiteUri,
    isCreating: addApp.isCreating
})


export default connect(mapStateToProps,{...appActions})(AppCardAddContainer)