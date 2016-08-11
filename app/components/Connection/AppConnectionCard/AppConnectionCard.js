import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import WebAssetIcon from 'material-ui/svg-icons/av/web-asset';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {
    cardWrapper
} from './styles.css'

const {
    object,
    string,
    func
} = PropTypes

/**
 * AppCard() returns an UI Card component
 */
// TODO: Only initial setup, refer to App Card for guidance.
AppConnectionCard.propTypes = {
    backendSiteUri: string.isRequired,
    appConnectionUri: string.isRequired,
    appConnectionType: string.isRequired,
    appConnectionName: string.isRequired,
    goToAppConnectionDetail: func,
    actions: object.isRequired
}

function AppConnectionCard (props) {
    return (
        <Card>
            <CardHeader title={props.backendSiteUri} />
            <CardText>
                {props.appConnectionUri}
                {props.appConnectionType}
                {props.appConnectionName}
                {props.children}
            </CardText>
            <CardActions>{props.actions}</CardActions>
        </Card>
    )
}

export default AppConnectionCard
