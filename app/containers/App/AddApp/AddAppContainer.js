import { AddApp } from 'components'
import { connect } from 'react-redux'
import {
    addApp as addAppActions,
    apps as appsActions
} from 'actions'

function mapStateToProps({addApp, users}) {
    const backendSiteUriLength = addApp.backendSiteUri.length
    return {
        user: users[users.authenticatedId] ? users[users.authenticatedId].info : {},
        backendSiteUri: addApp.backendSiteUri,
        uri: addApp.uri,
        isActive: addApp.isActive,
        isSubmitDisabled: backendSiteUriLength <= 0 || backendSiteUriLength > 140
    }
}

export default connect(
    mapStateToProps,
    {...addAppActions, ...appsActions}
)(AddApp)