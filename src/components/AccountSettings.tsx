import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';


import DoneIcon from '@material-ui/icons/Done';

import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as auth from '../api/auth';

import './AccountSettings.css';


import { AuthContextConsumer } from '../contexts/authContext';

type AccountSettingsState = {}

type AccountSettingsProps = {
    history: any;
}

class AccountSettings extends React.Component<AccountSettingsProps, AccountSettingsState> {
    constructor(props: AccountSettingsProps) {
        super(props);
    }

    handleLogout(callback: any) {
        try {
            auth.logout();

            callback();

            this.props.history.push('/login');
        }
        catch(error) {
            console.log('error',error)
            
        }
    }

    render() {
        return (
            <div className="page-container">
                <div className="page">
                    <Typography className="page-header" color="primary" variant="h3">Account Settings</Typography>

                    <div className="account-settings-form">
                        <div className="field-container">
                            <div className="field-name">First Name</div>

                            <div className="field-value">Brian</div>

                            <div className="edit-field-icon-btn-container">
                                <IconButton className="edit-field-icon-btn" aria-label="edit" disabled color="primary">
                                    <EditIcon className="edit-field-icon" />
                                </IconButton>
                                <div className="edit-label">Change</div>
                            </div>
                        </div>

                        <Divider />

                        <div className="field-container">  
                            <div className="field-name">Last Name</div>
                            
                            <div className="field-value">Albin</div>

                            <div className="edit-field-icon-btn-container">
                                <IconButton className="edit-field-icon-btn" aria-label="edit" disabled color="primary">
                                    <EditIcon className="edit-field-icon" />
                                </IconButton>
                                <div className="edit-label">Change</div>
                            </div>
                        </div>

                        <Divider />

                        <div className="field-container"> 
                            <div className="field-name">Email</div>
                            
                            <div className="field-value">brianalbin3taco@gmail.com</div>

                            <div className="edit-field-icon-btn-container">
                                <IconButton className="edit-field-icon-btn" aria-label="edit" disabled color="primary">
                                    <EditIcon className="edit-field-icon" />
                                </IconButton>
                                <div className="edit-label">Change</div>
                            </div>
                        </div>

                        <Divider />

                        <div className="field-container"> 
                            <div className="field-name">Phone</div>
                            
                            <div className="field-value">(410) 917-6440</div>

                            <div className="edit-field-icon-btn-container">
                                <IconButton className="edit-field-icon-btn" aria-label="edit" disabled color="primary">
                                    <EditIcon className="edit-field-icon" />
                                </IconButton>
                                <div className="edit-label">Change</div>
                            </div>
                        </div>

                    </div>

                    <AuthContextConsumer>
                    {context => (
                        <Button onClick={ e => this.handleLogout(context.logout)} className="auth-btn" variant="contained" color="primary" size="medium">Logout</Button>
                    )}
                    </AuthContextConsumer>
                </div>
            </div>
        );
    }
}

export default AccountSettings;