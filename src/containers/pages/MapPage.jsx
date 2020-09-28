import React from 'react';

import Map from '../../components/Map';
import PlaceDetails from '../../components/PlaceDetails';
import PointsDrawer from '../../components/PointsDrawer';
import RouteMatrixDialog from '../../components/RouteMatrixDialog';
import PrioritizationDrawer from '../../components/PrioritizationDrawer';
import Settings from '../../components/Settings';
import SettingsDrawer from '../../components/SettingsDrawer';

function MapPage() {

    const [ state, setState ] = React.useState({
        mapIsLoaded: false,
        togglePointDrawer: false,
        toggleRouteMatrix: false,
        togglePrioritizationDrawer: false,
        toggleSettingsClick: false
    });

    const handleMapOnLoad = () => {
        setState({
            ...state,
            mapIsLoaded: true
        });
    };

    const handleMenuClick = () => {
        setState({
            ...state,
            togglePointDrawer: !state.togglePointDrawer
        });
    };

    const handleShowingMatrix = () => {
        setState({
            ...state,
            togglePointDrawer: !state.togglePointDrawer,
            toggleRouteMatrix: !state.toggleRouteMatrix
        });
    };

    const handlePrioitizationClick = () => {
        setState({
            ...state,
            togglePrioritizationDrawer: !state.togglePrioritizationDrawer
        });
    };

    const handleSettingsClick = () => {
        setState({
            ...state,
            toggleSettingsClick: !state.toggleSettingsClick
        });
    };

    return (
        <div style={{
            overflow: 'hidden'
        }}>
            <Map 
                onLoad={handleMapOnLoad}
                onMenuClick={handleMenuClick}
            />
            <PlaceDetails />
            <PointsDrawer 
                open={state.togglePointDrawer}
                onClose={handleMenuClick}
                onShowRouteMatrix={handleShowingMatrix}
            />
            <PrioritizationDrawer 
                open={state.togglePrioritizationDrawer}
                onClose={handlePrioitizationClick}
            />
            <SettingsDrawer 
                open={state.toggleSettingsClick}
                onClose={handleSettingsClick}
            />
            <RouteMatrixDialog 
                open={state.toggleRouteMatrix}
                onClose={handleShowingMatrix}
            />
            <Settings 
                onMenuClick={handleMenuClick}
                onPrioritizationClick={handlePrioitizationClick}
                onSettingsClick={handleSettingsClick}
            />
        </div>
    );
}

export default MapPage;