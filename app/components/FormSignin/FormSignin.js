import React, { Component, PropTypes } from 'react'
import { v4 } from 'node-uuid'
import capitalize from 'lodash/capitalize'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import { getProviderInfo } from 'helpers/utils'
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
    func
} = PropTypes

const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = capitalize(field) + ' required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Enter a valid email address'
    }
    return errors
}

class FormSignin extends Component {

    renderTextField = field => {
        return (
            <TextField
                className={formField}
                key={field.name}
                floatingLabelText={field.floatingLabelText}
                hintText={field.hintText}
                errorText={field.meta.touched && field.meta.error ? field.meta.error : ''}
                {...field.input}
            />
        )}

    renderForm = (props) => {

        const { handleSubmit, pristine, submitting, onSubmit} = props

        return (

            <form onSubmit={handleSubmit((event) => onSubmit(EMAIL, event))}>
                <Field
                    name="email"
                    type="text"
                    ref={(ref) => this.emailField = ref}
                    component={this.renderTextField}
                    floatingLabelText={`Email Address`}
                    hintText={`Enter your email address`}
                />
                <Field
                    name="password"
                    type="password"
                    ref={(ref) => this.passwordField = ref}
                    component={this.renderTextField}
                    floatingLabelText={`Password`}
                    hintText={`Enter your password`}
                />
                <RaisedButton
                    className={formButton}
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

    renderError = () => (
        <div>
            <p className={errorMsg}>{'Oops! We had an issue getting you logged in. We think you may have mistyped either your email address or password.'}</p>
            <p className={errorMsg}>{'Please try again.'}</p>
        </div>
    )

    render () {
        const { formError } = this.props
        return (
            <div className={centeredContainer}>
                <br />
                {this.renderForm(this.props)}
                {
                    formError
                        ?   this.renderError()
                        :   null
                }
            </div>
        )
    }

}

FormSignin.propTypes = {
    formError: string.isRequired,
    onSubmit: func.isRequired
}

export default reduxForm({
    form: 'signin',
    validate
})(FormSignin)
