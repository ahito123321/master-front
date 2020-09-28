import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles({
    container: {
        minWidth: 250,
        maxWidth: 320,
        padding: '15px 10px'
    },
    header: {
        marginBottom: 15
    },
    formControl: {
        marginBottom: 15
    }
});

/*
1  	- равноценность
3	- умеренное превосходство
5	- сильное превосходство
7	- очень сильное превосходство
9	- высшее (крайнее) превосходство
*/
function PrioritizationDrawer(props) {
    const classes = useStyles();

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    const handleChangePrioritization = key => event => {
        props.dispatch({
            type: 'SET',
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
                    Приоритизация критериев
                </Typography>

                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="distanceToTime">Расстояние ко времени</InputLabel>
                    <Select
                        labelId="distanceToTime"
                        id="distanceToTime"
                        value={props.prioritization.distanceToTime}
                        onChange={handleChangePrioritization('distanceToTime')}
                    >
                        <MenuItem value={1}>Равноценность</MenuItem>
                        <MenuItem value={3}>Умеренное превосходство</MenuItem>
                        <MenuItem value={5}>Сильное превосходство</MenuItem>
                        <MenuItem value={7}>Очень сильное превосходство</MenuItem>
                        <MenuItem value={9}>Высшее превосходство</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="priceToTime">Стоимость ко времени</InputLabel>
                    <Select
                        labelId="priceToTime"
                        id="priceToTime"
                        value={props.prioritization.priceToTime}
                        onChange={handleChangePrioritization('priceToTime')}
                    >
                        <MenuItem value={1}>Равноценность</MenuItem>
                        <MenuItem value={3}>Умеренное превосходство</MenuItem>
                        <MenuItem value={5}>Сильное превосходство</MenuItem>
                        <MenuItem value={7}>Очень сильное превосходство</MenuItem>
                        <MenuItem value={9}>Высшее превосходство</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="priceToDistance">Стоимость к расстоянию</InputLabel>
                    <Select
                        labelId="priceToDistance"
                        id="priceToDistance"
                        value={props.prioritization.priceToDistance}
                        onChange={handleChangePrioritization('priceToDistance')}
                    >
                        <MenuItem value={1}>Равноценность</MenuItem>
                        <MenuItem value={3}>Умеренное превосходство</MenuItem>
                        <MenuItem value={5}>Сильное превосходство</MenuItem>
                        <MenuItem value={7}>Очень сильное превосходство</MenuItem>
                        <MenuItem value={9}>Высшее превосходство</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Drawer>
    );
}

const mapStateToProps = state => {
    return {
        prioritization: state.prioritization
    }
};

export default connect(mapStateToProps)(PrioritizationDrawer);