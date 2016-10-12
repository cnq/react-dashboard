import React, { PropTypes, Component } from 'react'
import FlatButton from 'material-ui/FlatButton';
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
                    <FlatButton onClick={(event) => {event.stopPropagation(); this.openDeleteConfirmation();}} label="Delete Connection" />
                </div>
            )
        }


        return (
                <div>
                    <ConnectionCard
                        className={s.connectionWrapper}
                        connectionUri={this.props.connection.connectionUri}
                        connectionType={this.props.connection.connectionType}
                        connectionName={this.props.connection.connectionName}
                        isCreating={this.props.connection.isCreating}
                        isDeleting={this.props.connection.isDeleting}
                        actions={renderCardActions()}
                    />
                    <DialogConfirm
                        title = "Delete Connection"
                        message = {"You are about to delete this connection.  This cannot be undone.  Are you sure?"}
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
    connection: PropTypes.object.isRequired,
    deleteConnection: PropTypes.func.isRequired
}

export default Connection
