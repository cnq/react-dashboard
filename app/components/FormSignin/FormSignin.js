import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
    centeredContainer,
    errorMsg
} from 'shared/styles.css'

const {
    string,
    func,
    bool,
    array
} = PropTypes

FormSignin.propTypes = {
    error: string.isRequired,
    isFetching: bool.isRequired,
    onAuth: func.isRequired
    //fields: array.isRequired
}

function FormSignin(props) {

    const renderError = ({ error }) => {
        return (
            error
                ?   <div className={errorMsg}>
                        <strong>Oops!</strong> {error}
                    </div>
                :   null
        )
    }

    return (
        <div className={centeredContainer}>
            <form onSubmit={props.onAuth}>
                <div>
                    <TextField
                        hintText="Enter an email address"
                        floatingLabelText="Email"
                        type="password"
                    />
                </div>
                <div>
                    <TextField
                        hintText="Enter a password"
                        floatingLabelText="Password"
                        type="password"
                    />
                </div>
                {renderError(props)}
                <div className={centeredContainer}>
                    <RaisedButton label="Sign In" primary={true} action="submit" />
                </div>
            </form>
        </div>
    )

}

export default FormSignin
