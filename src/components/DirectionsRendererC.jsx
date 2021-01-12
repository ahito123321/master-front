import React from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

function DirectionsRendererC(props) {
    const [ response, setResponse ] = React.useState(null);
    const [ initRoute, setRoute ] = React.useState(props.directionsServiceOption);

    if (!response) {
        if (initRoute.destination.lat !== props.directionsServiceOption.destination.lat &&
            initRoute.destination.lng !== props.directionsServiceOption.destination.lng &&
            initRoute.origin.lat !== props.directionsServiceOption.origin.lat &&
            initRoute.origin.lng !== props.directionsServiceOption.origin.lng
        ) {
            setResponse(null);
        }
    }
    console.log('props', props);
    console.log('response', response);
    console.log('initRoute', initRoute);
    
    if (!!response) {
        return <DirectionsRenderer
            options={{
                directions: response,
            }}
            routeIndex={props.index}
        />;
    }

    return (
        <DirectionsService
            options={props.directionsServiceOption}
            callback={(response, status) => {
                console.log('\nstatus', status);
                console.log('response', response);
                if (status === "OK") {
                    setResponse(response);
                } else {
                    console.log('\nstatus', status);
                    console.log('response', response);
                }
            }}
        />
    );
}

export default DirectionsRendererC;