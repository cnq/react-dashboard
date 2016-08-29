import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {
    cardWrapper
} from './styles.css'

const {
    object,
    string,
    func,
    bool
} = PropTypes

/**
 * ConnectionCard() returns an UI Card component
 */
// TODO: Refer to App Card for guidance.
ConnectionCard.propTypes = {
    connectionUri: string.isRequired,
    connectionType: string.isRequired,
    connectionName: string.isRequired,
    connectionDetails: bool.isRequired,
    goToConnectionDetail: func,
    actions: object.isRequired
}

function ConnectionCard (props) {
    if (!props.connectionDetails) {
        return (
            <Card>
                <CardHeader title={props.connectionType}/>
                <CardText>
                    <div>{props.connectionName}</div>
                    <div>{props.connectionUri}</div>
                </CardText>
                <CardActions>{props.actions}</CardActions>
            </Card>
        )
    } else {
        return (
            <Card>
                <CardHeader title={`Connection Details`}/>
                <CardText>
                    <div>{props.connectionType}</div>
                    <div>{props.connectionName}</div>
                    <div>{props.connectionUri}</div>
                </CardText>
                <CardActions>{props.actions}</CardActions>
            </Card>
        )
    }

}

export default ConnectionCard
