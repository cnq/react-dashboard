import React, { PropTypes } from 'react'
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
    buttonContainer,
    buttonLabel
} from 'shared/styles.css'
import {
    formField,
    formButtons
} from './styles.css'

const {
    string,
    bool,
    func
} = PropTypes

FormSignin.propTypes = {
    formError: string.isRequired,
    isFetching: bool.isRequired,
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
    <div className={formField}>
        <TextField
            key={field.name}
            errorText={field.touched && field.error}
            {...field.input}
        />
    </div>
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
                    component={renderTextField}
                    floatingLabelText={`Password`}
                    hintText={`Please enter your password`}
                />
                <div className={formButtons}>
                    <RaisedButton
                        className={buttonLabel}
                        type="submit"
                        disabled={pristine || submitting}
                        fullWidth={true}
                    >
                        {`Sign In`}
                    </RaisedButton>
                </div>
            </form>
        )

    }

    const { formError, isFetching } = props

    return (
        <div className={centeredContainer}>
            <br />
            {
                isFetching === true
                    ?   <div>{'Loading'}</div>
                    :   renderForm(props)
            }
            {formError ? <p className={errorMsg}>{'Oops! Well this is embarrassing, we had an issue getting you logged in. Please try again.'}</p> : null}
        </div>

     )

}

export default reduxForm({
    form: 'signin',
    validate
    //asyncValidate
})(FormSignin)
