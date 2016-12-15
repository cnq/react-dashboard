import React, { PropTypes, Component } from 'react'
import {Card, CardText, } from 'material-ui/Card'
import LinearProgress from 'material-ui/LinearProgress'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { table, dataTable, progressContainer, addText, uri, clickable } from '../styles.css'
import { cardContainer } from './UserCard.css'

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAccountAdmin: props.isAccountAdmin
        }
    }
    handleRoleChange = (event, index, value) => {
        this.setState({
            ... this.state,
            isAccountAdmin: value
        })
        this.props.handleRoleChange(value)
    }

    render() {
         return (
                <Card style={{boxShadow: "none", border: "solid rgba(0, 0, 0, 0.117647)", borderWidth: "0 1px 1px 1px", borderRadius: "0"}} containerStyle={{padding: "0"}}>
                    <CardText className={cardContainer} style={{padding: "0"}}>
                        {   this.props.isCreating || this.props.isDeleting ? <div className={`${dataTable} ${progressContainer}`}><span className={addText}>{this.props.isCreating ? `Adding User` : `Deleting User`}</span><LinearProgress mode="indeterminate" color={"#3ED1D6"} style={{bottom: "0", height: "4px", borderRadius: "0"}} /></div> :
                                <ul className={`${table} ${dataTable}`}>
                                    <li>{this.props.userName}</li>
                                    <li></li>
                                    <li>
                                        {this.props.allowRoleSelection ? 
                                            <SelectField value={this.state.isAccountAdmin} onChange={this.handleRoleChange}>
                                                <MenuItem value={true} primaryText="Admin" />
                                                <MenuItem value={false} primaryText="Regular" />
                                            </SelectField>
                                            :
                                             <div>{this.props.isAccountAdmin ? "Admin" : "Regular"}</div>
                                        }

                                    </li>
                                    <li>{this.props.actions}</li>
                                </ul>
                        }
                    </CardText>
                </Card>
        )
    }
}

UserCard.propTypes = {
    userName: PropTypes.string.isRequired,
    isAccountAdmin: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool,
    isDeleting: PropTypes.bool,
    actions: PropTypes.object,
    handleRoleChange: PropTypes.func,
    allowRoleSelection: PropTypes.bool.isRequired
}

export default UserCard
