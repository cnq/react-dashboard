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
 * ConnectionCard() returns an UI Card component
 */
// TODO: Refer to App Card for guidance.
ConnectionCard.propTypes = {
    connectionUri: string.isRequired,
    connectionType: string.isRequired,
    connectionName: string.isRequired,
    goToConnectionDetail: func,
    actions: object.isRequired
}

function ConnectionCard (props) {
    return (
        <Card>
            <CardHeader title={props.title} />
            <CardText>
                {props.connectionUri}
                {props.connectionName}
                {props.children}
            </CardText>
            <CardActions>{props.actions}</CardActions>
        </Card>
    )
}

export default ConnectionCard
