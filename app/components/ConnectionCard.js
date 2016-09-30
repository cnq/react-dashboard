import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { cardWrapper } from './ConnectionCard.css'
import { LoadingIndicator } from 'components'


ConnectionCard.propTypes = {
    connectionUri: PropTypes.string.isRequired,
    connectionType: PropTypes.string.isRequired,
    connectionName: PropTypes.string.isRequired,
    isCreating: PropTypes.bool,
    isDeleting: PropTypes.bool,
    actions: PropTypes.object.isRequired
}

function ConnectionCard (props) {
     return (
            <Card>
                <CardHeader title={props.connectionType}/>
                <CardText>
                    <div>{props.connectionName}</div>
                    <div>{props.connectionUri}</div>
                </CardText>
                {props.isCreating || props.isDeleting  ? <LoadingIndicator size={1} /> : <CardActions>{props.actions}</CardActions> }
            </Card>
    )
                }

export default ConnectionCard
