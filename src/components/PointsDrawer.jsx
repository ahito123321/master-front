import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';

const useStylesExpansionPanel = makeStyles({
    boldFont: {
        fontWeight: 'bold'
    }
});

function PointExpansionPanel(props) {
    const classes = useStylesExpansionPanel();
    const [state, setState] = React.useState({
        open: false
    });
    const point = props.points[props.currentIndex];

    const handleChange = () => {
        setState({
            ...state,
            open: !state.open
        });
    };

    const handleChangeStartPoint = event => {
        props.dispatch({
            type: 'TOGGLE_START_POINT',
            data: {
                index: props.currentIndex,
                checked: event.target.checked
            }
        });
    };

    const handleChangeValues = id => event => {
        props.dispatch({
            type: 'CHANGE_TIME_SPENDING',
            data: {
                id: id,
                time: +event.target.value
            }
        });
    };

    const handleClickRemove = id => () => {
        if (props.onRemovePoint) {
            props.onRemovePoint(id);
        }
    };  

    return (
        <ExpansionPanel expanded={state.open} onChange={handleChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
            >
                <Grid container>   
                    <Grid item xs={2}>
                        <Typography className={point.isStartingPoint ? classes.boldFont : ''}>{point.id}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="caption" component="div">lng: {point.position.lng}</Typography>
                        <Typography variant="caption" component="div">lat: {point.position.lat}</Typography>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <div>
                        <FormControlLabel 
                            control={<Switch />} 
                            label="Стартовая точка" 
                            checked={point.isStartingPoint}
                            onChange={handleChangeStartPoint} 
                        />
                    </div>
                    {props.settings.takeWorkingHours &&
                        <div>
                            <TextField
                                id="time"
                                label="Время препровождения (мин)"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                className={classes.textField}
                                value={point.spendTime}
                                onChange={handleChangeValues(point.id)}
                            />
                        </div>
                    }
                    <div>
                        <Button fullWidth onClick={handleClickRemove(point.id)}> 
                            Удалить точку
                        </Button>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

const useStyles = makeStyles({
    container: {
        minWidth: 250,
        maxWidth: 320,
        padding: '15px 0px'
    }
});

function PointsDrawer(props) {
    const classes = useStyles();

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    const handleClickShowMatrix = () => {
        if (props.onShowRouteMatrix) {
            props.onShowRouteMatrix();
        }  
    };

    const handleRemovePoint = pointId => {
        props.dispatch({
            type: 'REMOVE_POINT',
            data: {
                id: pointId
            }
        });
    };

    return (
        <Drawer 
            open={props.open} 
            onClose={handleClose}
        >
            <div className={classes.container}>
                {props.points.length === 0 && (
                    <Typography variant="caption" align="center" component="div">Список пуст</Typography>
                )}
                {props.points.length > 0 && (
                    <>
                        <div>
                            <Button fullWidth onClick={handleClickShowMatrix}> 
                                Показать матрицу
                            </Button>
                        </div>
                        {props.points.map((point, index) => {
                            return <PointExpansionPanel 
                                key={`GB${index}/${point.id}`} 
                                currentIndex={index} 
                                points={props.points}
                                settings={props.settings}
                                dispatch={props.dispatch}
                                onRemovePoint={handleRemovePoint}
                            />;
                        })}
                    </>
                )}
            </div>
        </Drawer>
    );
}

const mapStateToProps = state => {
    return {
        points: state.points,
        settings: state.settings
    }
};

export default connect(mapStateToProps)(PointsDrawer);