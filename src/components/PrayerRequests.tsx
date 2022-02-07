import React  from 'react';

type PrayerRequestsState = {

}

type PrayerRequestsProps = {

}

class PrayerRequests extends React.Component<PrayerRequestsProps, PrayerRequestsState> {
    constructor(props: PrayerRequestsProps) {
        super(props);
    }

    render() {
        return (
            <h1>Prayer Requests</h1>
        );
    }
}

export default PrayerRequests;