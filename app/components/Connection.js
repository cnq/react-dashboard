import React, { PropTypes, Component } from 'react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/content/create'
import PowerIcon from 'material-ui/svg-icons/action/power-settings-new'
import ReactTooltip from 'react-tooltip'
import { ConnectionCard, DialogConfirm } from 'components'
import s from './Connection.css'

class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteConfirmation: false
        }
    }
    openDeleteConfirmation = () => {
        this.setState({
            ... this.state,
            showDeleteConfirmation: true
        })
    }
    closeDeleteConfirmation = () => {
        this.setState({
            ... this.state,
            showDeleteConfirmation: false
        })
    }

    render () {
        const renderCardActions = () => {
            return (
                <div>
                    {/*
                    <PowerIcon data-tip data-for='power' onClick={() => {}} color={'#D4D4D4'} hoverColor={'#7dc93a'} style={{width: '32px', cursor: 'pointer'}} />
                    <ReactTooltip id='power' type='success' effect='solid'>
                        <span>Turn On</span>
                    </ReactTooltip>
                    <EditIcon data-tip data-for='edit' onClick={() => {}} color={'#D4D4D4'} hoverColor={'#3a89c9'} style={{width: '32px', cursor: 'pointer'}} />
                    <ReactTooltip id='edit' type='info' effect='solid'>
                        <span>Edit</span>
                    </ReactTooltip>
                    */}
                    <DeleteIcon data-tip data-for='delete' onClick={(event) => {event.stopPropagation(); this.openDeleteConfirmation();}} color={'#D4D4D4'} hoverColor={'#ff4242'} style={{width: '32px', cursor: 'pointer'}}  />
                    <ReactTooltip id='delete' type='error' effect='solid'>
                        <span>Delete</span>
                    </ReactTooltip>
                </div>
            )
        }
        const renderMessage = () => {
            return (
                <div style={{fontSize: '1.5em', lineHeight: '1.5em'}}>
                    {`You are about to delete this connection.`}
                    <div>{`This cannot be undone. Are you sure you want to delete?`}</div>
                </div>
            )
        }
        return (
                <div>
                    <ConnectionCard
                        className={s.connectionWrapper}
                        uri={this.props.uri}
                        connectionUri={this.props.connection.connectionUri}
                        connectionType={this.props.connection.connectionType}
                        connectionName={this.props.connection.connectionName}
                        isCreating={this.props.connection.isCreating}
                        isDeleting={this.props.connection.isDeleting}
                        actions={renderCardActions()}
                    />
                    <DialogConfirm
                        title = "Delete Connection"
                        message = {renderMessage()}
                        isOpen = {this.state.showDeleteConfirmation}
                        confirmButtonText = "Yes, Delete"
                        confirmCallback = {() => { this.closeDeleteConfirmation(); this.props.deleteConnection(this.props.connection); } }
                        cancelCallback = {this.closeDeleteConfirmation}     
                        />
                </div>
            )
     }

}

Connection.propTypes = {
    uri: PropTypes.string.isRequired,
    connection: PropTypes.object.isRequired,
    deleteConnection: PropTypes.func.isRequired
}

export default Connection
