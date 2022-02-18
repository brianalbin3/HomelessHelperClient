import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';


import DoneIcon from '@material-ui/icons/Done';

import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorBox from './ErrorBox';


import User from '../models/User';
import * as auth from '../api/auth';
import * as userAPI from '../api/user';

import './AccountSettings.css';


import { AuthContextConsumer } from '../contexts/authContext';

type AccountSettingsState = {
    user: User | undefined,
    couldNotLoadUser: boolean,
    editingFirstName: boolean,
    editingLastName: boolean,
    editingPhone: boolean,
}

type AccountSettingsProps = {
    history: any;
}

class AccountSettings extends React.Component<AccountSettingsProps, AccountSettingsState> {
    constructor(props: AccountSettingsProps) {
        super(props);

        this.state = {
            user: undefined,
            couldNotLoadUser: false,
            editingFirstName: false,
            editingLastName: false,
            editingPhone: false
        };

        this.getUser();

        this.editFirstName = this.editFirstName.bind(this);
        this.editLastName = this.editLastName.bind(this);
        this.editPhone = this.editPhone.bind(this);
    }

    async getUser() {
        try {
            let result = await userAPI.getCurrentUser();
            let user: User = result.data;

            this.setState({user});
        }
        catch(e) {
            console.error("error=",e)
            this.setState({couldNotLoadUser: true});
        }
    }

    editFirstName() {
        console.log("editFirstName()")
        this.setState({ editingFirstName: true });
    }

    editLastName() {
        console.log("editLastName()")
        this.setState({ editingLastName: true });
    }

    editPhone() {
        console.log("editPhone()")
        this.setState({ editingPhone: true });
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
        const { couldNotLoadUser, editingFirstName, editingLastName, editingPhone } = this.state;

        if ( couldNotLoadUser ) {
            return (
                <div className="page-container">
                    <div className="page">
                        <Typography className="page-header" color="primary" variant="h3">Account Settings</Typography>
                        <ErrorBox message="Uh-oh, we couldn't load your profile. Try refreshing the page." />
                    </div>
                </div>
            );
        }

        const user: User | undefined = this.state.user;

        if ( !user ) {
            return (
                <div className="page-container">
                    <div className="page">
                        <Typography className="page-header" color="primary" variant="h3">Account Settings</Typography>
                        <div className="spinner-container">
                            <CircularProgress size="4rem" color="primary"/>
                        </div>
                    </div>
                </div>
            );
        }

        const { nameFirst, nameLast, email, phoneNumber } = user;

        // function editPortion() {
        //     if (editingFirstName) {
        //         return (

        //         );
        //     }
        // }

        return (
            <div className="page-container">
                <div className="page">
                    <Typography className="page-header" color="primary" variant="h3">Account Settings</Typography>

                    <div className="account-settings-form">
                        <div className="field-container"> 
                            <div className="field-name">Email</div>
                            
                            <div className="field-value">{email}</div>

                            <div className="edit-field-icon-btn-container">
                                <IconButton className="edit-field-icon-btn" aria-label="edit" color="primary">
                                    <EditIcon className="edit-field-icon" />
                                </IconButton>
                                <div className="edit-label"></div>
                            </div>
                        </div>

                        <Divider />

                        <div className="field-container">
                            <div className="field-name">First Name</div>

                            <div className="field-value">{nameFirst}</div>

                            <div className="edit-field-icon-btn-container">
                                <IconButton onClick={this.editFirstName} className="edit-field-icon-btn" aria-label="edit" color="primary">
                                    <EditIcon className="edit-field-icon" />
                                </IconButton>
                                <div className="edit-label">Change</div>
                            </div>
                        </div>

                        <Divider />

                        <div className="field-container">  
                            <div className="field-name">Last Name</div>
                            
                            <div className="field-value">{nameLast}</div>

                            <div className="edit-field-icon-btn-container">
                                <IconButton onClick={this.editLastName} className="edit-field-icon-btn" aria-label="edit" color="primary">
                                    <EditIcon className="edit-field-icon" />
                                </IconButton>
                                <div className="edit-label">Change</div>
                            </div>
                        </div>

                        <Divider />

                        <div className="field-container"> 
                            <div className="field-name">Phone</div>
                            
                            <div className="field-value">{phoneNumber}</div>

                            <div className="edit-field-icon-btn-container">
                                <IconButton  onClick={this.editPhone} className="edit-field-icon-btn" aria-label="edit" color="primary">
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