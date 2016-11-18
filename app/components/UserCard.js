import React, { PropTypes } from 'react'
import {Card, CardText} from 'material-ui/Card';
import { table, dataTable, progressContainer, addText, uri, clickable } from '../styles.css'
import { cardContainer } from './UserCard.css'
import LinearProgress from 'material-ui/LinearProgress'


UserCard.propTypes = {
    userName: PropTypes.string.isRequired,
    isAccountAdmin: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool,
    isDeleting: PropTypes.bool,
    actions: PropTypes.object.isRequired
}

function UserCard (props) {
     return (
            <Card style={{boxShadow: "none", border: "solid rgba(0, 0, 0, 0.117647)", borderWidth: "0 1px 1px 1px", borderRadius: "0"}} containerStyle={{padding: "0"}}>
                <CardText className={cardContainer} style={{padding: "0"}}>
                    {   props.isCreating || props.isDeleting ? <div className={`${dataTable} ${progressContainer}`}><span className={addText}>{props.isCreating ? `Adding User` : `Deleting User`}</span><LinearProgress mode="indeterminate" color={"#3ED1D6"} style={{bottom: "0", height: "4px", borderRadius: "0"}} /></div> :
                            <ul className={`${table} ${dataTable}`}>
                                <li>{props.userName}</li>
                                <li></li>
                                <li>{props.isAccountAdmin ? "Admin" : "Regular"}</li>
                                <li>{props.actions}</li>
                            </ul>
                    }
                </CardText>
            </Card>
    )
                }

export default UserCard
