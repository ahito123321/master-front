import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { googleMap } from '../configs/index';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const styles = {
    root: {
        position: 'relative'
    },
    map: {
        height: '100vh'
    },
    searchControlPanelRoot: {
        padding: '2px 4px',
        maxWidth: 400,
        minWidth: 320,
        position: 'absolute',
        top: 10,
        left: 10
    },
    searchControlPanelContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    searchControlPanelInput: {
        marginLeft: 1,
        flex: 1,
    },
    searchControlPanelIconButton: {
        padding: 10,
    },
    searchControlPanelDivider: {
        height: 28,
        margin: 4,
    }
};

export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            map: {},
            center: {
                lat: 0,
                lng: 0
            },
            mapIsLoaded: false,
            searchText: ''
        };

        this.autocomplete = null;
    }

    handleLoadingScriptError = error => {
        console.log(error);
        this.props.enqueueSnackbar('Произошла ошибка при загрузке карты!', {
            variant: 'error'
        });
    }

    handleMapClick = event => {
        this.setState({
            ...this.state,
            center: {
                lat: this.state.map.center.lat(),
                lng: this.state.map.center.lng()
            }
        }, () => {
            this.props.dispatch({
                type: 'ADD_POINT',
                data: {
                    position: {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    },
                    spendTime: 60
                }
            });
        });
    }

    handleLoadMap = map => {
        this.setState({
            ...this.state,
            map: map,
            mapIsLoaded: true
        }, () => {
            if (this.props.onLoad) {
                this.props.onLoad();
            }
        });
    }

    handleMenuClick = () => {
        if (this.props.onMenuClick) {
            this.props.onMenuClick();
        }
    }

    handleSearchTextChange = event => {
        this.setState({
            ...this.state,
            searchText: event.target.value
        });
    }

    handleClickSearchRoute = event => {
        if (this.props.points.length >= 3) {
            console.log('search');
            let points = this.props.points;
            points.forEach(point => {
                delete point['googleDetails'];
            });
            let body = {
                prioritization: {...this.props.prioritization},
                settings: {...this.props.settings},
                points: [...points]
            };
            console.log(body);
            console.log(JSON.stringify(body));
        } else {
            this.props.enqueueSnackbar('Извините! Добавьте больше точек!', {
                variant: 'info'
            });
        }
    }

    onLoadAutoCompolete = autocomplete => {
        this.autocomplete = autocomplete;
    }

    onPlaceChanged = () => {
        if (this.autocomplete !== null) {
            let place = this.autocomplete.getPlace();
            this.setState({
                ...this.state,
                center: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }
            }, () => {
                this.props.dispatch({
                    type: 'ADD_POINT',
                    data: {
                        position: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        }
                    }
                });
            });
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    }

    handleRemovePoint = pointId => () => {
        this.props.dispatch({
            type: 'REMOVE_POINT',
            data: {
                id: pointId
            }
        });
    };

    render() {
        const { classes, points } = this.props;

        return (
            <div className={classes.root}>
                <LoadScript
                    id="script-loader"
                    googleMapsApiKey={googleMap.apiKey}
                    onError={this.handleLoadingScriptError}
                    libraries={[ 'places' ]}
                >
                    <GoogleMap
                        id='map'
                        mapContainerStyle={styles.map}
                        zoom={2}
                        center={this.state.center}
                        onCenterChanged={this.handleMapCenterChange}
                        onClick={this.handleMapClick}
                        onLoad={this.handleLoadMap}
                        options={{
                            panControl: false,
                            keyboardShortcuts: false,
                            mapTypeControl: false,
                            rotateControl: false,
                            scaleControl: false,
                            scrollwheel: true,
                            streetViewControl: false,
                            zoomControl: false,
                            fullscreenControl: false
                        }}
                    >
                        {this.props.points.map((marker, index) => {
                            return (
                                <div key={index} data-index={index}>
                                    <Marker
                                        position={marker.position}
                                        onClick={this.handleRemovePoint(marker.id)}
                                    />
                                </div>
                            );
                        })}
                        <Autocomplete
                            onLoad={this.onLoadAutoCompolete}
                            onPlaceChanged={this.onPlaceChanged}
                        >
                            <Paper className={classes.searchControlPanelRoot}>
                                <div className={classes.searchControlPanelContainer}>
                                    <IconButton 
                                        className={classes.searchControlPanelIconButton} 
                                        aria-label="menu" 
                                        onClick={this.handleMenuClick}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <InputBase
                                        className={classes.searchControlPanelInput}
                                        placeholder="Поиск месты"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        onChange={this.handleSearchTextChange}
                                    />
                                    <Divider className={classes.searchControlPanelDivider} orientation="vertical" />
                                    <IconButton 
                                        color="primary" 
                                        className={classes.searchControlPanelIconButton} 
                                        aria-label="directions"
                                        onClick={this.handleClickSearchRoute}
                                    >
                                        <Badge 
                                            badgeContent={points.length}
                                            invisible={points.length < 1} 
                                            color="secondary" 
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <DirectionsIcon />
                                        </Badge>
                                    </IconButton>
                                </div>
                            </Paper>
                        </Autocomplete>
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        points: state.points,
        prioritization: state.prioritization,
        settings: state.settings
    }
};

export default connect(mapStateToProps)(withSnackbar(withStyles(styles)(MapContainer)));