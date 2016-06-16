import React, { PropTypes } from 'react'
//import { } from './styles.css'
const {
    string,
    func,
    bool,
    array
} = PropTypes

FormSignin.propTypes = {
    error: string.isRequired,
    isFetching: bool.isRequired,
    onAuth: func.isRequired,
    fields: array.isRequired
}

export default function FormSignin ({onAuth, isFetching, error, email, password}) {
    return (
        <div className='auth card box-shadow'>
            <div className='card-block'>
                <form onAuth={this.onAuth.bind(this)}>
                    <fieldset className='input-group input-group-lg'>
                        <input placeholder='Email' className='form-control' {...email} />
                    </fieldset>
                    <fieldset className='input-group input-group-lg'>
                        <input placeholder='Password' className='form-control' type='password' {...password} />
                    </fieldset>
                    {error ? <p>{error}</p> : null}
                    <button className='btn btn-primary btn-lg btn-block' action='submit'>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}