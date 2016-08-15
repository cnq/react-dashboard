import React, { PropTypes } from 'react'
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
    backendSiteUri: string.isRequired,
    devSiteUri: string.isRequired,
    connections: object,
    goToAppDetail: func,
    actions: object.isRequired
}

function AppCard (props) {
    return (
        <Card>
            <CardHeader title={props.backendSiteUri ? props.backendSiteUri : ''} />
            <CardText>
                {props.devSiteUri ? props.devSiteUri : ''}
                {props.connections ? props.connections : ''}
                {props.children}
            </CardText>
            <CardActions>{props.actions}</CardActions>
        </Card>
    )
}

export default AppCard
