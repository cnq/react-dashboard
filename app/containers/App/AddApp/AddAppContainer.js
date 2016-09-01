import { AddApp } from 'components'
import { connect } from 'react-redux'
import {
    addApp as addAppActions,
    apps as appsActions
} from 'actions'

const mapStateToProps = ({addApp, users}) => ({
    user: users[users.authenticatedId] ? users[users.authenticatedId].info : {},
    backendSiteUri: addApp.backendSiteUri,
    uri: addApp.uri,
    isActive: addApp.isActive,
    isSubmitDisabled: addApp.backendSiteUri.length <= 0 || addApp.backendSiteUri.length > 140
})

export default connect(
    mapStateToProps,
    {...addAppActions, ...appsActions}
)(AddApp)