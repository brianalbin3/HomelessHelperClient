import React from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Typography from '@material-ui/core/Typography';
import { DateTime } from 'luxon';

import { Calendar, luxonLocalizer } from 'react-big-calendar';


type ScheduleProps = {};
type ScheduleState = {};



class Schedule extends React.Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props);
    }

    render() {

        const localizer = luxonLocalizer(DateTime);

        var events = [
            {
                id: 0,
                title: 'All Day Event very long title',
                allDay: true,
                start: new Date(2015, 3, 0),
                end: new Date(2015, 3, 1),
            }
        ]


        return (
            <div className="page-container">
                <div className="page">
                    <Typography className="page-header" color="primary" variant="h3">Upcoming Events</Typography>

                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }} />
                </div>
            </div>
        );
    }
}

export default Schedule;