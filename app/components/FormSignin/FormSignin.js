import React, { PropTypes } from 'react'
import { v4 } from 'node-uuid'
import { Field, reduxForm, propTypes } from 'redux-form';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { getProviderInfo, asyncValidate } from 'helpers/utils'
import { AuthButton } from 'components';
import {
    EMAIL
} from 'config/constants'
import {
    centeredContainer,
    errorMsg,
    buttonContainer
} from 'shared/styles.css'
import {
    formField,
    formButton
} from './styles.css'

const buttonStyles = {
    color: '#ffffff'
}

const {
    string,
    bool,
    func
} = PropTypes

FormSignin.propTypes = {
    formError: string.isRequired,
    onAuth: func.isRequired
}

const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const renderTextField = field => (
    <TextField
        className={formField}
        key={v4()}
        errorText={field.touched && field.error}
        {...field.input}
    />
)

function FormSignin (props) {

    const renderForm = (props) => {
        
        const { handleSubmit, pristine, submitting, onAuth } = props

        return (

            <form onSubmit={handleSubmit((event) => onAuth({provider: EMAIL}, event))}>
                <Field
                    name="email"
                    component={renderTextField}
                    floatingLabelText={`Email Address`}
                    hintText={`Please enter your email address`}
                />
                <Field
                    name="password"
                    type="password"
                    component={renderTextField}
                    floatingLabelText={`Password`}
                    hintText={`Please enter your password`}
                />
                <RaisedButton className={formButton}
                    type="submit"
                    disabled={pristine || submitting}
                    fullWidth={false}
                    backgroundColor="#7DC93A"
                    labelStyle={buttonStyles}
                >
                    {`Sign In`}
                </RaisedButton>
            </form>
        )

    }

    const { formError } = props

    return (
        <div className={centeredContainer}>
            <br />
            {renderForm(props)}
            {formError ? <p className={errorMsg}>{'Oops! Well this is embarrassing, we had an issue getting you logged in. Please try again.'}</p> : null}
        </div>

     )

}

export default reduxForm({
    form: 'signin',
    validate
    //asyncValidate
})(FormSignin)
