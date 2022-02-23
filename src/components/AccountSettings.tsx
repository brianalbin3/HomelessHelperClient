import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import CloseIcon from '@material-ui/icons/Close'

import DoneIcon from '@material-ui/icons/Done';

import FormHelperText from '@material-ui/core/FormHelperText';

import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';

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
    updateError: boolean,
    updateSuccessSnackbarOpen: boolean,
    snackbarText: string,
    nameFirstFormValue: string,
    nameLastFormValue: string,
    phoneNumberFormValue: string,
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
            editingPhone: false,
            updateError: false,
            updateSuccessSnackbarOpen: false,
            snackbarText: '',
            nameFirstFormValue: '',
            nameLastFormValue: '',
            phoneNumberFormValue: '',
        };

        this.getUser();

        this.editFirstName = this.editFirstName.bind(this);
        this.cancelEditFirstName = this.cancelEditFirstName.bind(this);
        this.saveFirstName = this.saveFirstName.bind(this);
        this.handleChangeFirstNameFormValue = this.handleChangeFirstNameFormValue.bind(this);

        this.editLastName = this.editLastName.bind(this);
        this.cancelEditLastName = this.cancelEditLastName.bind(this);
        this.saveLastName = this.saveLastName.bind(this);
        this.handleChangeLastNameFormValue = this.handleChangeLastNameFormValue.bind(this);

        this.editPhone = this.editPhone.bind(this);
        this.cancelEditPhone = this.cancelEditPhone.bind(this);
        this.savePhone = this.savePhone.bind(this);
        this.handleChangePhoneFormValue = this.handleChangePhoneFormValue.bind(this);

        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    }

    async getUser() {
        try {
            let result = await userAPI.getCurrentUser();
            let user: User = result.data;

            // Need to keep track of their last saved value since if the user hits cancel we want to revert
            this.setState({
                user,
                nameFirstFormValue: user.nameFirst,
                nameLastFormValue: user.nameLast,
                phoneNumberFormValue: user.phoneNumber
            });
        }
        catch(e) {
            console.error("error=",e)
            this.setState({couldNotLoadUser: true});
        }
    }

    editFirstName() {
        this.setState({ editingFirstName: true, editingLastName: false, editingPhone: false });
    }

    async saveFirstName() {
        let user: User | undefined = this.state.user;
        const { nameFirstFormValue } = this.state;

        if (!user) {
            return;
        }

        const { id } = user;

        try {
            await userAPI.updateNameFirst(id as number, nameFirstFormValue);

            user.nameFirst = nameFirstFormValue;
            
            this.setState({
                user,
                editingFirstName: false,
                updateError: false,
                updateSuccessSnackbarOpen: true,
                snackbarText: 'First Name Updated'
            });
        }
        catch ( error ) {
            this.setState({updateError: true, updateSuccessSnackbarOpen: false});
        }
    }

    handleChangeFirstNameFormValue(e: any) {
        this.setState({nameFirstFormValue: e.target.value});
    }

    cancelEditFirstName() {
        const user: User = this.state.user as User;

        this.setState({
            editingFirstName: false,
            nameFirstFormValue: user.nameFirst
        });
    }

    editLastName() {
        this.setState({ editingLastName: true, editingFirstName: false, editingPhone: false });
    }

    cancelEditLastName() {
        const user: User = this.state.user as User;

        this.setState({
            editingLastName: false,
            nameLastFormValue: user.nameLast
        });
    }

    async saveLastName() {
        let user: User | undefined = this.state.user;
        const { nameLastFormValue } = this.state;

        if (!user) {
            return;
        }

        const { id } = user;

        try {
            await userAPI.updateNameLast(id as number, nameLastFormValue);

            user.nameLast = nameLastFormValue;
            
            this.setState({
                user,
                editingLastName: false,
                updateError: false,
                updateSuccessSnackbarOpen: true,
                snackbarText: 'Last Name Updated'
            });
        }
        catch ( error ) {
            this.setState({updateError: true, updateSuccessSnackbarOpen: false});
        }
    }

    handleChangeLastNameFormValue(e: any) {
        this.setState({nameLastFormValue: e.target.value});
    }

    editPhone() {
        this.setState({ editingPhone: true, editingFirstName: false, editingLastName: false });
    }

    cancelEditPhone() {
        const user: User = this.state.user as User;

        this.setState({
            editingPhone: false,
            phoneNumberFormValue: user.phoneNumber
        });
    }

    async savePhone() {
        let user: User | undefined = this.state.user;
        const { phoneNumberFormValue } = this.state;

        if (!user) {
            return;
        }

        const { id } = user;

        try {
            await userAPI.updatePhoneNumber(id as number, phoneNumberFormValue);

            user.phoneNumber = phoneNumberFormValue;
            
            this.setState({
                user,
                editingPhone: false,
                updateError: false,
                updateSuccessSnackbarOpen: true,
                snackbarText: 'Phone Number Updated'
            });
        }
        catch ( error ) {
            this.setState({updateError: true, updateSuccessSnackbarOpen: false});
        }
    }

    handleChangePhoneFormValue(e: any) {
        this.setState({phoneNumberFormValue: e.target.value});
    }

    handleCloseSnackbar(event: React.SyntheticEvent<any>) {
        this.setState({updateSuccessSnackbarOpen: false});
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
        const {
            couldNotLoadUser,
            editingFirstName,
            editingLastName,
            editingPhone,
            updateError,
            updateSuccessSnackbarOpen,
            snackbarText,
            nameFirstFormValue,
            nameLastFormValue,
            phoneNumberFormValue
        } = this.state;

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

        // TODO: Rename this
        const firstNameValuePortion = () => {
            if (!editingFirstName) {
                return (nameFirst);
            }

            return (
                <TextField onChange={this.handleChangeFirstNameFormValue} value={nameFirstFormValue} label="First Name" variant="filled" helperText="Enter first name"  inputProps={{ maxLength: 50}} />
            );
        }

        const firstNameButtons = () => {
            if (!editingFirstName) {
                return (
                    <div className="edit-field-icon-btn-container">
                        <IconButton onClick={this.editFirstName} className="edit-field-icon-btn" aria-label="edit" color="primary">
                            <EditIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Change</div>
                    </div>
                );
            }

            return (
                <div className="edit-field-icon-btn-container">
                    <div className="save-cancel-btns-container">
                        <IconButton onClick={this.cancelEditFirstName} className="edit-field-icon-btn" aria-label="cancel" color="primary">
                            <CloseIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Cancel</div>
                    </div>
                    <div className="save-cancel-btns-container">
                        <IconButton onClick={this.saveFirstName} className="edit-field-icon-btn" aria-label="save" color="primary">
                            <DoneIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Save</div>
                    </div>
            </div>
            )
        }

        // TODO: Rename this
        const lastNameValuePortion = () => {
            if (!editingLastName) {
                return (nameLast);
            }

            return (
                <TextField onChange={this.handleChangeLastNameFormValue} value={nameLastFormValue} label="Last Name" variant="filled" helperText="Enter last name" inputProps={{ maxLength: 50}} />
            );
        }

        const lastNameButtons = () => {
            if (!editingLastName) {
                return (
                    <div className="edit-field-icon-btn-container">
                        <IconButton onClick={this.editLastName} className="edit-field-icon-btn" aria-label="edit" color="primary">
                            <EditIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Change</div>
                    </div>
                );
            }

            return (
                <div className="edit-field-icon-btn-container">
                    <div className="save-cancel-btns-container">
                        <IconButton onClick={this.cancelEditLastName} className="edit-field-icon-btn" aria-label="cancel" color="primary">
                            <CloseIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Cancel</div>
                    </div>
                    <div className="save-cancel-btns-container">
                        <IconButton onClick={this.saveLastName} className="edit-field-icon-btn" aria-label="save" color="primary">
                            <DoneIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Save</div>
                    </div>
            </div>
            )
        }

        // TODO: Rename this
        const phoneValuePortion = () => {
            if (!editingPhone) {
                return ( phoneNumber );
            }

            return (
                <TextField onChange={this.handleChangePhoneFormValue} value={phoneNumberFormValue} label="Phone Number" variant="filled" helperText="Enter phone #" inputProps={{ maxLength: 10, type: "tel" }} />
            );
        }

        const phoneButtons = () => {
            if (!editingPhone) {
                return (
                    <div className="edit-field-icon-btn-container">
                        <IconButton onClick={this.editPhone} className="edit-field-icon-btn" aria-label="edit" color="primary">
                            <EditIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Change</div>
                    </div>
                );
            }

            return (
                <div className="edit-field-icon-btn-container">
                    <div className="save-cancel-btns-container">
                        <IconButton onClick={this.cancelEditPhone} className="edit-field-icon-btn" aria-label="cancel" color="primary">
                            <CloseIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Cancel</div>
                    </div>
                    <div className="save-cancel-btns-container">
                        <IconButton onClick={this.savePhone} className="edit-field-icon-btn" aria-label="save" color="primary">
                            <DoneIcon className="edit-field-icon" />
                        </IconButton>
                        <div className="edit-label">Save</div>
                    </div>
            </div>
            )
        }

        return (
            <div className="page-container">
                <div className="page">
                    <Typography className="page-header" color="primary" variant="h3">Account Settings</Typography>

                    <div className="account-settings-form">
                        <div className="field-container"> 
                            <div className="field-name">Email</div>
                            
                            <div className="field-value">{email}</div>

                            <div className="edit-field-icon-btn-container">
                                <div className="edit-label"></div>
                            </div>
                        </div>

                        <Divider />

                        <div className={`${editingFirstName ? 'field-container-highlighted' : ''} field-container`}>
                            <div className="field-name">First Name</div>

                            <div className="field-value">
                                {firstNameValuePortion()}
                            </div>

                            {firstNameButtons()}
                        </div>

                        <Divider />

                        <div className={`${editingLastName ? 'field-container-highlighted' : ''} field-container`}>
                            <div className="field-name">Last Name</div>
                            
                            <div className="field-value">
                                {lastNameValuePortion()}
                            </div>

                            {lastNameButtons()}
                        </div>

                        <Divider />

                        <div className={`${editingPhone ? 'field-container-highlighted' : ''} field-container`}>
                            <div className="field-name">Phone</div>
                            
                            <div className="field-value">
                                {phoneValuePortion()}
                            </div>

                            {phoneButtons()}
                        </div>

                        <FormHelperText className={`${updateError ? "" : "display-none"}`} error={true}>Uh-oh! A problem occured. Please refresh the page and try again.</FormHelperText>

                    </div>

                    <AuthContextConsumer>
                    {context => (
                        <Button onClick={ e => this.handleLogout(context.logout)} className="logout-btn" variant="contained" color="primary" size="medium">Logout</Button>
                    )}
                    </AuthContextConsumer>
                </div>

                <Snackbar
                    open={updateSuccessSnackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackbar}
                    message={snackbarText}
                    action={
                        <React.Fragment>
                            {/* <Button color="secondary" size="small" onClick={this.handleUndoAddEvent}>UNDO</Button> */}
                            <IconButton size="small" aria-label="close" color="secondary" onClick={this.handleCloseSnackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        );
    }
}

export default AccountSettings;