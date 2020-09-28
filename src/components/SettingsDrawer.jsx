import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles({
    container: {
        minWidth: 250,
        maxWidth: 320,
        padding: '15px 10px'
    },
    header: {
        marginBottom: 15
    },
    textField: {
        marginBottom: 10
    }
});

function SettingsDrawer(props) {
    const classes = useStyles();

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    const handleChangeSettings = key => event => {
        props.dispatch({
            type: 'SET',
            data: {
                key: key,
                value: event.target.checked
            }
        });
    };

    const handleChangeValues = key => event => {
        props.dispatch({
            type: 'SET_NUMBERS',
            data: {
                key: key,
                value: +event.target.value
            }
        });
    };

    return (
        <Drawer 
            open={props.open} 
            onClose={handleClose}
        >
            <div className={classes.container}>
                <Typography align="center" className={classes.header}>
                    Настройки
                </Typography>

                <FormControlLabel 
                    control={<Switch />} 
                    label="Учитывать приоритизацию" 
                    checked={props.settings.takePrioritization}
                    onChange={handleChangeSettings('takePrioritization')} 
                />
                <FormControlLabel 
                    control={<Switch />} 
                    label="Учитывать рейтинг" 
                    checked={props.settings.takeRating}
                    onChange={handleChangeSettings('takeRating')} 
                />
                {props.settings.takeRating &&
                    <>
                        <TextField
                            id="radius"
                            label="Радиус (м)"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            className={classes.textField}
                            value={props.settings.radius}
                            onChange={handleChangeValues('radius')}
                        />
                    </>
                }
                <FormControlLabel 
                    control={<Switch />} 
                    label="Учитывать рабочие часы" 
                    checked={props.settings.takeWorkingHours}
                    onChange={handleChangeSettings('takeWorkingHours')} 
                />
                <FormControlLabel 
                    control={<Switch />} 
                    label="Учитывать стоимость маршрута" 
                    checked={props.settings.takeRoutePrice}
                    onChange={handleChangeSettings('takeRoutePrice')} 
                />
                {props.settings.takeRoutePrice &&
                    <>
                        <TextField
                            id="carConsumption"
                            label="Расход авто"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            className={classes.textField}
                            value={props.settings.carConsumption}
                            onChange={handleChangeValues('carConsumption')}
                        />
                        <TextField
                            id="take-route-price-number-2"
                            label="Стоимость топлива за л"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            className={classes.textField}
                            value={props.settings.fuelCost}
                            onChange={handleChangeValues('fuelCost')}
                        />
                    </>
                }
            </div>
        </Drawer>
    );
}

const mapStateToProps = state => {
    return {
        settings: state.settings
    }
};

export default connect(mapStateToProps)(SettingsDrawer);