import { AddAppCard } from 'components'
import { connect } from 'react-redux'
import {
    updateAddAppCard as updateAddAppCardActions,
    apps as appsActions
} from 'actions'

const mapStateToProps = ({updateAddAppCard, users}) => ({
    user: users[users.authenticatedId] ? users[users.authenticatedId].info : {},
    backendSiteUri: updateAddAppCard.backendSiteUri,
    uri: updateAddAppCard.uri,
    isActive: updateAddAppCard.isActive,
    isSubmitDisabled: updateAddAppCard.backendSiteUri.length <= 0 || updateAddAppCard.backendSiteUri.length > 140
})

export default connect(
    mapStateToProps,
    {...updateAddAppCardActions, ...appsActions}
)(AddAppCard)