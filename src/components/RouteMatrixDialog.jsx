import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    tableContainer: {
        '& th': {
            border: '1px solid',
            padding: '5px'
        },
        '& td': {
            border: '1px solid',
            verticalAlign: 'middle'
        },
        '& td:first-child': {
            padding: '5px'
        }
    },
    cursorPointer: {
        cursor: 'pointer',
        '&:hover': {
            background: 'rgba(240, 240, 240, 0.8)'
        }
    }
});

function CellWrapper(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [variant, setVariant] = React.useState(props.initialVariant);

    const handleChange = (event) => {
        let mode = event.target.value;
        setVariant(mode);
        
        if (props.onChange) {
            props.onChange(mode);
        }
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <td>
            <FormControl className={classes.formControl} fullWidth>
                <Select
                    id="select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={variant}
                    onChange={handleChange}
                >
                    <MenuItem value="DRIVING">Авто</MenuItem>
                    <MenuItem value="BICYCLING">Велосипед</MenuItem>
                    <MenuItem value="WALKING">Пешком</MenuItem>
                    <MenuItem value="INF">Невозможно</MenuItem>
                </Select>
            </FormControl>
        </td>
    )
}

function RouteMatrixDialog(props) {
    const classes = useStyles();

    const handleShowingMatrix = () => { 
        if (props.onClose) {
            props.onClose();
        }     
    };

    const handleChangeTravelMode = (pointId, additionalPointId) => variant => {
        if (props.dispatch) {
            props.dispatch({
                type: 'CHANGE_TRAVEL_MODE',
                data: {
                    variant: variant,
                    additionalPointId: additionalPointId,
                    pointId: pointId
                }
            });
        }
    };

    const getRowWrapper = (rowIndex, point) => {
        let arr = [];
        let aindex = 0;

        for (let index = 0; index <= point.anotherPoints.length; index++) {
            if (index === rowIndex) {
                arr.push(
                    <td key={`AB${index}C`}>
                        <Typography>Невозможно</Typography>
                    </td>
                );
            } else {
                arr.push(
                    <CellWrapper 
                        key={`AB${point.anotherPoints[aindex].id}`}
                        onChange={handleChangeTravelMode(point.id, point.anotherPoints[aindex].id)}
                        initialVariant={point.anotherPoints[aindex].variant}
                    />
                );
                aindex = aindex + 1;
            }
        }
        return arr;
    };

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleShowingMatrix}
            aria-labelledby="dialog-slide-title"
            aria-describedby="dialog-slide-description"
        >
            <DialogContent>
                <table className={classes.tableContainer}>
                    <thead>
                        <tr>
                            <th></th>
                            {props.points.map(point => {
                                return (
                                    <th key={`B${point.id}`}>
                                        {point.id}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.points.map((point, pindex) => {
                            return (
                                <tr key={`A${point.id}`}>
                                    <td>{point.id}</td>
                                    {getRowWrapper(pindex, point)}                            
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </DialogContent>
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        points: state.points
    }
};

export default connect(mapStateToProps)(RouteMatrixDialog);