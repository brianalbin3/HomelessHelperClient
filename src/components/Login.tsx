import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import PasswordInput from './PasswordInput';

import * as auth from '../api/auth';

import { AuthContextConsumer } from '../contexts/authContext';


import './Login.css';

enum LoginFailureType {
    BAD_EMAIL_PASSWORD,
    INTERNAL_SERVER_ERROR,
    ACCOUNT_LOCKED,
    NONE
}

type LoginState = {
    email: string,
    password: string,
    submitIsTouched: boolean,
    loginFailureType: LoginFailureType
}

type LoginProps = {
    history: any
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = { email: '', password: '', submitIsTouched: false, loginFailureType: LoginFailureType.NONE };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleEmailChange(e: any) {
        const email = e.target.value;
        this.setState({email});
    }

    emailHasError(): boolean {
        const { email, submitIsTouched } = this.state;
        return email.length === 0 && submitIsTouched;
    }
    
    handlePasswordChange(e: any) {
        const password = e.target.value;
        this.setState({password});
    }

    passwordHasError(): boolean {
        const { password, submitIsTouched } = this.state;
        return password.length === 0 && submitIsTouched;
    }

    hasFormError(): boolean {
        return this.state.loginFailureType !== LoginFailureType.NONE;
    }

    getFormErrorText() {
        if (this.state.loginFailureType === LoginFailureType.BAD_EMAIL_PASSWORD) {
            return 'The password you’ve entered is incorrect.';
        }
        else if ( this.state.loginFailureType === LoginFailureType.INTERNAL_SERVER_ERROR ) {
            return 'Uh-oh! A problem occured. Please refresh the page and try again.';
        }

        return '';
    }

    async handleSubmit(callback: any) {
        const { email, password } = this.state;

        this.setState({submitIsTouched: true, loginFailureType: LoginFailureType.NONE});

        if ( email.length === 0 || password.length === 0 ) {
            return;
        }

        try {
            await auth.login(email,password);
            
            callback();
            
            this.props.history.push('/features/schedule');
        }
        catch ( error ) {
            if ( error.response.status === 401 ) {
                if ( error.response.data.message === 'Email or password is incorrect' ) { // Keep text same as client
                    this.setState({loginFailureType: LoginFailureType.BAD_EMAIL_PASSWORD});
                }
                else if ( error.response.data.message === 'Account locked' ) { // Keep text same as server
                    this.setState({loginFailureType: LoginFailureType.ACCOUNT_LOCKED});
                }
                else {
                    console.error("Unknown 401 status code response", error);
                }
            }
            else if ( error.response.status === 500 ) {
                this.setState({loginFailureType: LoginFailureType.INTERNAL_SERVER_ERROR});
            }
            else {
                console.error('Unhandled error'); // TODO: Handle this
            }
        }
    }

    render() {

        if ( this.state.loginFailureType === LoginFailureType.ACCOUNT_LOCKED ) {
            return (<Redirect to="/findaccount"/>);
        }

        return (
            <div className="auth-page-container">
                <div className="auth-page">
                    <Typography className="auth-header" color="primary" variant="h4">Login to Your Account</Typography>
                    <form className="auth-form">
                        <TextField onChange={this.handleEmailChange} className="auth-txt-field" label="Email" variant="filled" error={this.emailHasError()} helperText="Enter your email"/>
                        <PasswordInput onChange={this.handlePasswordChange} inputProps={{ maxLength: 32 }} className="auth-txt-field" error={this.passwordHasError()} helperText="Enter your password" label="Password"/>
                        <AuthContextConsumer>
                        {context => (
                            <Button onClick={ e => this.handleSubmit(context.login)} className="auth-btn" variant="contained" color="primary" size="medium">Login</Button>
                        )}
                        </AuthContextConsumer>
                        <FormHelperText className={`auth-err ${this.hasFormError() ? "" : "display-none"}`} error={true}>{this.getFormErrorText()}</FormHelperText>
                        <div className="non-important-btns-container">
                            <Link className="no-underline" to="/register">
                                <Button className="non-important-btn" color="primary">Create Account</Button>
                            </Link>
                            <Link className="no-underline" to="/findaccount">
                                <Button className="non-important-btn" color="primary">Forgot Password?</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;