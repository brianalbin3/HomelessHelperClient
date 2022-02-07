import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PrayerRequestIcon from '@material-ui/icons/AccessibilityNew';
import MapIcon from '@material-ui/icons/Map';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
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
                            <NavLink className="icon-container" to="/features/schedule" activeClassName="icon-container-active">
                                <EventIcon className="icon" />
                                <div className="icon-description">Schedule</div>
                            </NavLink>
                            <NavLink className="icon-container" to="/features/homelesspeople" activeClassName="icon-container-active">
                                <PeopleIcon className="icon" />
                                <div className="icon-description">Homeless People</div>
                            </NavLink>
                            <NavLink className="icon-container" to="/features/prayerrequests" activeClassName="icon-container-active">
                                <PrayerRequestIcon className="icon" />
                                <div className="icon-description">Prayer Requests</div>
                            </NavLink>
                            <NavLink className="icon-container" to="/features/map" activeClassName="icon-container-active">
                                <MapIcon className="icon" />
                                <div className="icon-description">Map</div>
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