import React from 'react';
import { withSnackbar } from 'notistack';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import googleService from '../services/googleService';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 320,
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-160px)'
    },
    paper: {
        paddint: 5,
        width: '100%'
    },
}));

function PlaceDetails(props) {
    const classes = useStyles();
    const [ state, setState ] = React.useState({
        storedNumberOfPoints: props.points.length,
        place: {},
        show: false,
        isLoaded: false
    });

    React.useEffect(() => {
        const getPlaceDetailsByPosition = async () => {
            try {
                let response = await googleService.getPlaceDetailsByPosition(props.points[state.storedNumberOfPoints - 1].position);
                let place = response.results.filter(place => {
                    return place.types.some(type => type === 'route');
                });
                props.dispatch({
                    type: 'ADD_GOOGLE_DETAILS',
                    data: {
                        position: props.points[state.storedNumberOfPoints - 1].position,
                        googleDetails: response.results
                    }
                });
                setState({
                    ...state,
                    place: place[0],
                    show: true,
                    isLoaded: true
                });
            } catch (error) {
                console.log(error);
                props.enqueueSnackbar(error.message, {
                    variant: 'error'
                });
            }
        };

        if (!state.isLoaded && props.points[state.storedNumberOfPoints - 1]) {
            getPlaceDetailsByPosition();
        }
    });

    if (state.storedNumberOfPoints < props.points.length) {
        setState({
            ...state,
            storedNumberOfPoints: props.points.length,
            isLoaded: false
        });
    }
    if (state.storedNumberOfPoints > props.points.length) {
        setState({
            ...state,
            storedNumberOfPoints: props.points.length,
            show: false
        });
    }

    const handleClose = () => {
        setState({
            ...state,
            show: false
        });
    };
    if (!props.points[state.storedNumberOfPoints - 1]) {
        return <></>;
    }

    return (
        <div className={classes.root}>
            <Slide direction="up" in={state.show} mountOnEnter unmountOnExit>
                <Paper elevation={4} className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12}>
                            {!state.isLoaded && <Skeleton animation="wave" />}
                            {state.isLoaded && !!state.place && (
                                <Typography align="center" component="div">
                                    ({props.points[state.storedNumberOfPoints - 1].id}){state.place.formatted_address}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {!state.isLoaded && <Skeleton animation="wave" />}
                            {state.isLoaded && !!state.place && (
                                <Typography align="center" variant="caption" component="div">
                                    lat: {props.points[state.storedNumberOfPoints - 1].position.lat}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {!state.isLoaded && <Skeleton animation="wave" />}
                            {state.isLoaded && !!state.place && (
                                <Typography align="center" variant="caption" component="div">
                                    lng: {props.points[state.storedNumberOfPoints - 1].position.lng}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {!state.isLoaded && <Skeleton animation="wave" />}
                            {state.isLoaded && state.place && (
                                <>
                                    <Divider />
                                    <Button size="small" className={classes.margin} fullWidth onClick={handleClose}>
                                        Закрыть
                                    </Button>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Slide>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        points: state.points
    }
};

export default connect(mapStateToProps)(withSnackbar(PlaceDetails));