import { AddApp } from 'components'
import { connect } from 'react-redux'
import {
    addAppConnection as addAppConnectionActions,
    appConnections as appConnectionsActions
} from 'actions'

function mapStateToProps({addAppConnection, appId}) {
    return {
        appId: appId,
        appConnectionUri: addAppConnection.appConnectionUri,
        appConnectionType: addAppConnection.appConnectionType,
        appConnectionName: addAppConnection.appConnectionName,
    }
}

export default connect(
    mapStateToProps,
    {...addAppConnectionActions, ...appConnectionsActions}
)(AddAppConnections)