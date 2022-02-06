import React from 'react';

type ScheduleState = {}

type ScheduleProps = {}

class Schedule extends React.Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props);
    }

    render() {
        return (
            <h1>Schedule</h1>
        );
    }
}

export default Schedule;