import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { cardWrapper } from './ConnectionCard.css'


ConnectionCard.propTypes = {
    connectionUri: PropTypes.string.isRequired,
    connectionType: PropTypes.string.isRequired,
    connectionName: PropTypes.string.isRequired,
    connectionDetails: PropTypes.bool.isRequired,
    goToConnectionDetail: PropTypes.func,
    actions: PropTypes.object.isRequired
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
