import { AddApp } from 'components'
import { connect } from 'react-redux'
import {
    addApp as addAppActions,
    apps as appsActions
} from 'actions'

function mapStateToProps({addApp, users}) {
    const appDomainLength = addApp.appDomain.length
    return {
        user: users[users.authenticatedId] ? users[users.authenticatedId].info : {},
        appDomain: addApp.appDomain,
        isActive: addApp.isActive,
        isSubmitDisabled: appDomainLength <= 0 || appDomainLength > 140
    }
}

export default connect(
    mapStateToProps,
    {...addAppActions, ...appsActions}
)(AddApp)