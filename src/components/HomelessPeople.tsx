import React  from 'react';

type HomelessPeopleState = {

}

type HomelessPeopleProps = {

}

class HomelessPeople extends React.Component<HomelessPeopleProps, HomelessPeopleState> {
    constructor(props: HomelessPeopleProps) {
        super(props);
    }

    render() {
        return (
            <h1>Homeless People</h1>
        );
    }
}

export default HomelessPeople;