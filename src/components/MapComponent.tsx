import React  from 'react';

type MapComponentState = {
  
}

type MapComponentProps = {

}

// TODO: Should {} be MapComponentProps
class MapComponent extends React.Component<{}, MapComponentState> {
    constructor(props: MapComponentProps) {
        super(props);
    }

    render() {

        return (
            <h1>Map of Frederick</h1>
        );
    }
}

export default MapComponent;