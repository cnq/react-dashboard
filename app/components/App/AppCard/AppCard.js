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
AppCard.propTypes = {
    app: string.isRequired,
    goToAppDetail: func,
    actions: object.isRequired
}

const connections = (props) => (
    <div>
        <Badge
            badgeContent={(props.app != null ? props.app.get('connections').size : "")}
            primary={true}
        >
        </Badge>
    </div>
);

function AppCard (props) {
    return (
        <Card>
            <CardHeader title={(props.app != null ? props.app.get('backendSiteUri'):"")} />
            <CardText>
                {(props.app != null ? props.app.get('uri'):"")}
                {connections(props)}
                {props.children}
            </CardText>
            <CardActions>{props.actions}</CardActions>
        </Card>
    )
}

export default AppCard
