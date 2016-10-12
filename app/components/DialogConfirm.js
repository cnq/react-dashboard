import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class DialogConfirm extends Component {


    handleClose = () => {
        this.props.cancelCallback();
    };
    handleConfirm = () => {
        this.props.confirmCallback();
    };

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose} />,
            <FlatButton label={this.props.confirmButtonText} primary={true} onTouchTap={this.handleConfirm}/>
        ];

    return (
          <div>
            <Dialog title={this.props.title} actions={actions} modal={true} open={this.props.isOpen} >
            {this.props.message}
            </Dialog>
          </div>
        );
    }
}

DialogConfirm.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    confirmButtonText: PropTypes.string.isRequired,
    confirmCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func.isRequired,
}