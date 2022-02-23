import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';

import qs from 'qs';

import AccountCircle from '@material-ui/icons/AccountCircle';

import * as userAPI from '../api/user';

import './PickResetMethod.css';

type PickResetMethodState = {
    email: string,
    phone: string,
    selectedContactMethod: string,
    pickResetMethodFailureType: PickResetMethodFailureType,
}

type PickResetMethodProps = {
    location: any,
    history: any
}

enum PickResetMethodFailureType {
    ACCOUNT_NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    NONE
}

class PickResetMethod extends React.Component<PickResetMethodProps, PickResetMethodState> {

    constructor(props: PickResetMethodProps) {
        super(props);

        let email: any = '';
        let phone: any = '';

        if (qs.parse(this.props.location.search, { ignoreQueryPrefix: true })) {
            email = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).email;
            phone = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).phone;
        }

        this.state = { email, selectedContactMethod: 'email', phone, pickResetMethodFailureType: PickResetMethodFailureType.NONE };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ selectedContactMethod: e.target.value });
    }

    displayFormError(): boolean {
        return this.state.pickResetMethodFailureType !== PickResetMethodFailureType.NONE;
    }

    getFormErrorText(): string {
        if (this.state.pickResetMethodFailureType === PickResetMethodFailureType.ACCOUNT_NOT_FOUND) {
            return 'We couldnt find that email.';
        }
        else if (this.state.pickResetMethodFailureType === PickResetMethodFailureType.INTERNAL_SERVER_ERROR) {
            return 'Internal error. Refresh the page.';
        }

        return '';
    }

    async handleSubmit(e: any) {
        try {
            const { email, phone, selectedContactMethod } = this.state;

            this.setState({ pickResetMethodFailureType: PickResetMethodFailureType.NONE });

            await userAPI.sendResetCode(email, selectedContactMethod);

            this.props.history.push(`/entercode?email=${email}&phone=${phone}&selectedContactMethod=${selectedContactMethod}`);
        }
        catch (error) {
            if (error.response.status === 404) {
                this.setState({ pickResetMethodFailureType: PickResetMethodFailureType.ACCOUNT_NOT_FOUND }); // This should never actually happen, do we really need it?
            }
            else if (error.response.status === 500) {
                this.setState({ pickResetMethodFailureType: PickResetMethodFailureType.INTERNAL_SERVER_ERROR });
            }
        }
    }
    
    render() {
        const { email, phone } = this.state;

        let emailOption = (
            <div>
                <div className="contact">
                    <div>
                        <div className="contact-method">Send Code Via Email</div>
                        <div className="contact-detail">{this.state.email}</div>
                    </div>
                    <div className="radio-container">
                        <Radio color="primary" checked={this.state.selectedContactMethod === 'email'} onChange={this.handleChange} value="email" />
                    </div>
                </div>
                <Divider className="contact-divider" />
            </div>
        );

        let phoneOption = (
            <div>
                <div className="contact">
                    <div>
                        <div className="contact-method">Send Code Via SMS</div>
                        <div className="contact-detail">{this.state.phone}</div>
                    </div>
                    <div className="radio-container">
                        <Radio color="primary" checked={this.state.selectedContactMethod === 'phone'} onChange={this.handleChange} value="phone" />
                    </div>
                </div>
                <Divider className="contact-divider" />
            </div>
        );

        return (
            <div className="auth-page-container">
                <div className="auth-page">
                    <Typography className="auth-header" color="primary" variant="h4">Pick Reset Method</Typography>
                    <form className="auth-form">
                        <Paper elevation={1} className="find-account-icon-container">
                            <AccountCircle color="primary" className="find-account-icon" />
                            <div>{this.state.email}</div>
                        </Paper>
                        <div className="auth-instructions desktop-only">Select how you would like to recieve the code to reset your password.</div>
                        <Divider className="contact-divider" />
                        {email && emailOption}
                        {phone && phoneOption}
                        <Button onClick={this.handleSubmit} className="auth-btn" variant="contained" color="primary" size="medium">Send Code</Button>
                        <FormHelperText className={`auth-err ${this.displayFormError() ? "" : "display-none"}`} error={true}>{this.getFormErrorText()}</FormHelperText>
                    </form>
                    <div className="non-important-btns-container">
                        <Link className="no-underline" to="/findaccount">
                            <Button className="find-email-btn non-important-btn" color="primary">Not You?</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default PickResetMethod;