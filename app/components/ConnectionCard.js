import React, { PropTypes } from 'react'
import {Card, CardText} from 'material-ui/Card';
import { table, dataTable, progressContainer, addText, uri, clickable } from '../styles.css'
import { cardContainer } from './ConnectionCard.css'
import LinearProgress from 'material-ui/LinearProgress'


ConnectionCard.propTypes = {
    uri: PropTypes.string.isRequired,
    connectionUri: PropTypes.string.isRequired,
    connectionType: PropTypes.string.isRequired,
    connectionName: PropTypes.string.isRequired,
    isCreating: PropTypes.bool,
    isDeleting: PropTypes.bool,
    actions: PropTypes.object.isRequired
}

function ConnectionCard (props) {
     return (
            <Card style={{boxShadow: "none", border: "solid rgba(0, 0, 0, 0.117647)", borderWidth: "0 1px 1px 1px", borderRadius: "0"}} containerStyle={{padding: "0"}}>
                <CardText className={cardContainer} style={{padding: "0"}}>
                    {   props.isCreating || props.isDeleting ? <div className={`${dataTable} ${progressContainer}`}><span className={addText}>{props.isCreating ? `Adding Connection` : `Deleting Connection`}</span><LinearProgress mode="indeterminate" color={"#3ED1D6"} style={{bottom: "0", height: "4px", borderRadius: "0"}} /></div> :
                            <ul className={`${table} ${dataTable}`}>
                                <li>{props.connectionType}</li>
                                <li><a className={`${uri} ${clickable}`} href={props.uri.slice(0, -1) + props.connectionName} target="_blank">{props.connectionName}</a></li>
                                <li>{props.connectionUri}</li>
                                <li>{props.actions}</li>
                            </ul>
                    }
                </CardText>
            </Card>
    )
                }

export default ConnectionCard
