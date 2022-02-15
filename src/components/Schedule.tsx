import React from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Typography from '@material-ui/core/Typography';
import { DateTime } from 'luxon';

import { Calendar, luxonLocalizer } from 'react-big-calendar';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CircularProgress from '@material-ui/core/CircularProgress';


import AddEventDialog from './AddEventDialog';

import ViewEventDialog from './ViewEventDialog';

import ErrorBox from './ErrorBox';

import Event from '../models/Event';


import './Schedule.css';

// TODO: rename this maybe?
import * as eventAPI from '../api/event';
import { EventSeatSharp } from '@material-ui/icons';


type ScheduleProps = {};
type ScheduleState = { currentEvent: Event | null, addEventDialogOpen: boolean, events: any, eventsLoaded: boolean, errorLoadingEvents: boolean}; // events: Event[]



class Schedule extends React.Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props);

        this.state = { currentEvent: null, addEventDialogOpen: false, events: [], eventsLoaded: false, errorLoadingEvents: false };

        this.eventClicked = this.eventClicked.bind(this);

        this.eventAdded = this.eventAdded.bind(this);

        this.openViewEventDialog = this.openViewEventDialog.bind(this);
        this.closeViewEventDialog = this.closeViewEventDialog.bind(this);

        this.openAddEventDialog = this.openAddEventDialog.bind(this);
        this.closeAddEventDialog = this.closeAddEventDialog.bind(this);
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
        console.log("event",event);
        console.log("e",e)

        this.openViewEventDialog(event);
    }

    openViewEventDialog(event: Event) {
        this.setState({currentEvent: event});
    }

    closeViewEventDialog(event: Event) {
        this.setState({currentEvent: null});
    }

    openAddEventDialog() {
        this.setState({addEventDialogOpen: true});
    }

    closeAddEventDialog() {
        this.setState({ addEventDialogOpen: false});
    }

    eventAdded(event: Event) {  // TODO: Type
        let events: any = this.state.events;
        events.push(event);

        this.setState({events: event})
        this.closeAddEventDialog();
    }

    render() {
        const localizer = luxonLocalizer(DateTime);
        var that: any = this;

        var events = this.state.events;

        const { currentEvent, addEventDialogOpen, eventsLoaded, errorLoadingEvents } = this.state;
        
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
                    <ViewEventDialog event={currentEvent}/>
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
                
            </div>
        );
    }
}

export default Schedule;