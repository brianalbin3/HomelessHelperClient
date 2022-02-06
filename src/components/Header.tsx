import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EventIcon from '@material-ui/icons/Event';
import SettingsPhoneIcon from '@material-ui/icons/SettingsPhone';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { NavLink } from 'react-router-dom';

import './Header.css';

type HeaderState = {}

type HeaderProps = {}

class Header extends React.Component<HeaderProps, HeaderState> {

    render() {
        return (
            <div className="app-bar-container">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className="title"></Typography>
                        <nav>
                            <NavLink className="icon-container" to="/features/medicine" activeClassName="icon-container-active">
                                <LocalHospitalIcon className="icon" />
                                <div className="icon-description">Medicines</div>
                            </NavLink>
                            <NavLink className="icon-container" to="/features/contactsettings" activeClassName="icon-container-active">
                                <SettingsPhoneIcon className="icon" />
                                <div className="icon-description">Calls</div>
                            </NavLink>
                            <NavLink className="icon-container" to="/features/alarms" activeClassName="icon-container-active">
                                <AccessAlarmIcon className="icon" />
                                <div className="icon-description">Alarms</div>
                            </NavLink>
                            <NavLink className="icon-container" to="/features/schedule" activeClassName="icon-container-active">
                                <EventIcon className="icon" />
                                <div className="icon-description">Schedule</div>
                            </NavLink>
                            <NavLink className="icon-container" to="/features/accountsettings" activeClassName="icon-container-active">
                                <AccountCircle className="icon" />
                                <div className="icon-description">Account</div>
                            </NavLink>
                        </nav>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;