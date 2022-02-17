import React from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Typography from '@material-ui/core/Typography';
import { DateTime } from 'luxon';

import { Calendar, luxonLocalizer } from 'react-big-calendar';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';


import AddEventDialog from './AddEventDialog';

import ViewEventDialog from './ViewEventDialog';

import ErrorBox from './ErrorBox';

import Event from '../models/Event';


import './Schedule.css';

// TODO: rename this maybe?
import * as eventAPI from '../api/event';

import Snackbar from '@material-ui/core/Snackbar';


type ScheduleProps = {};
type ScheduleState = {
    currentEvent: Event | null,
    addEventDialogOpen: boolean,
    events: any,
    eventsLoaded: boolean,
    errorLoadingEvents: boolean,
    deleteEventSnackbarOpen: boolean,
    successAddEventSnackbarOpen: boolean,
};



class Schedule extends React.Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props);

        this.state = { 
            currentEvent: null,
            addEventDialogOpen:
            false, events: [],
            eventsLoaded: false,
            errorLoadingEvents: false,
            deleteEventSnackbarOpen: false,
            successAddEventSnackbarOpen: false
            
        };

        this.eventClicked = this.eventClicked.bind(this);

        this.eventDeleted = this.eventDeleted.bind(this);

        this.eventAdded = this.eventAdded.bind(this);

        this.openViewEventDialog = this.openViewEventDialog.bind(this);
        this.closeViewEventDialog = this.closeViewEventDialog.bind(this);

        this.openAddEventDialog = this.openAddEventDialog.bind(this);
        this.closeAddEventDialog = this.closeAddEventDialog.bind(this);

        this.handleCloseAddEventSnackbar = this.handleCloseAddEventSnackbar.bind(this);
        this.handleUndoAddEvent = this.handleUndoAddEvent.bind(this);

        this.handleCloseDeleteEventSnackbar = this.handleCloseDeleteEventSnackbar.bind(this);
        this.handleUndoDeleteEvent = this.handleUndoDeleteEvent.bind(this);
    }

    async componentWillMount() {
        this.loadEvents();
    }

    async loadEvents() {
        try {
            // TODO: Types
            var result = await eventAPI.getEvents();
            var events: any = result.data;

            //TODO: Type
            events.forEach((event: any) => {
                event.start = DateTime.fromISO(event.start).toJSDate();
                event.end = DateTime.fromISO(event.end).toJSDate();
            });

            this.setState({events , eventsLoaded: true });
        }
        catch(e) {
            console.error("error=",e)
            this.setState({errorLoadingEvents: true});
        }
    }

    eventClicked(event: Event, e: any /*: SyntheticEvent*/) {
        this.openViewEventDialog(event);
    }

    openViewEventDialog(event: Event) {
        this.setState({currentEvent: event});
    }

    closeViewEventDialog() {
        this.setState({currentEvent: null});
    }

    openAddEventDialog() {
        this.setState({addEventDialogOpen: true});
    }

    closeAddEventDialog() {
        this.setState({ addEventDialogOpen: false});
    }

    handleCloseDeleteEventSnackbar(event: React.SyntheticEvent<any>) {
        this.setState({deleteEventSnackbarOpen: false})
    }

    handleUndoAddEvent(event: React.SyntheticEvent<any>) {
        // TODO:
    }

    handleCloseAddEventSnackbar(event: React.SyntheticEvent<any>) {
        this.setState({successAddEventSnackbarOpen: false})
    }

    handleUndoDeleteEvent(event: React.SyntheticEvent<any>) {
        // TODO:
    }

    eventDeleted(id: number) {
        let events: Event[] = this.state.events;
        events = events.filter(event => event.id != id);

        this.setState({events, deleteEventSnackbarOpen: true});

        this.closeViewEventDialog();
    }

    eventAdded(event: Event) {  // TODO: Type
        let events: any = this.state.events;
        events.push(event);
        
        this.setState({events, successAddEventSnackbarOpen: true})
        
        this.closeAddEventDialog();
    }

    render() {
        const localizer = luxonLocalizer(DateTime);
        var that: any = this;

        var events = this.state.events;

        const { successAddEventSnackbarOpen, deleteEventSnackbarOpen, currentEvent, addEventDialogOpen, eventsLoaded, errorLoadingEvents } = this.state;
        
        function calendar() {
            if (eventsLoaded) {
                return (
                    <Calendar
                    localizer={localizer}
                    events={events}
                    style={{ height: 500 }}
                    onSelectEvent={that.eventClicked}
                    />
                );
            }

            return (null);
        }

        function spinner() {
            if ( !eventsLoaded && !errorLoadingEvents) {
                return (
                    <div className="spinner-container">
                        <CircularProgress size="4rem" color="primary"/>
                    </div>
                );
            }

            return (null);
        }

        function loadingError() {
            if ( errorLoadingEvents ) {
                return (
                    <ErrorBox message="Couldn't load events!" />
                );
            }

            return (null);
        }

        function viewEventDialog() {
            if (currentEvent) {
                return (
                    <ViewEventDialog onDelete={that.eventDeleted} event={currentEvent} onCancel={that.closeViewEventDialog} />
                );
            }
        }

        function addEventDialog() {
            if (addEventDialogOpen) {
                return (
                    <AddEventDialog onEventAdded={that.eventAdded} onCancel={that.closeAddEventDialog} />
                );
            }

            return (null);
        }


        return (
            <div className="page-container">
                <div className="page">
                    <Typography className="page-header" color="primary" variant="h3">Upcoming Events</Typography>

                    {calendar()}
                    {loadingError()}
                    {spinner()}
                    {viewEventDialog()}
                    {addEventDialog()}
                    
                    <Fab onClick={this.openAddEventDialog} className="add-event" size="medium"  aria-label="Add Event" >
                        <AddIcon color="primary" />
                    </Fab>
                </div>
                
                <Snackbar
                    open={successAddEventSnackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleCloseAddEventSnackbar}
                    message="Event Added"
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={this.handleUndoAddEvent}>UNDO</Button>
                            <IconButton size="small" aria-label="close" color="secondary" onClick={this.handleCloseAddEventSnackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />

                <Snackbar
                    open={deleteEventSnackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleCloseDeleteEventSnackbar}
                    message="Event Deleted"
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={this.handleUndoDeleteEvent}>UNDO</Button>
                            <IconButton size="small" aria-label="close" color="secondary" onClick={this.handleCloseDeleteEventSnackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />

            </div>
        );
    }
}

export default Schedule;