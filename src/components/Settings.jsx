import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import SettingsIcon from '@material-ui/icons/Settings';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    routesSwitcherContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        margin: '0 auto',
    }
}));

function Settings(props) {
    const classes = useStyles();
    let keys = Object.keys(props.routes.labels || {});
    const isDisableBefore = keys.length > 1;
    const isDisableNext = keys.length > 1;

    const handleNavigateBefore = () => {
        let index = keys.findIndex(key => key === props.routes.selectedRoute);
        props.dispatch({
            type: 'SET_ROUTE',
            data: keys[index - 1] || keys[keys.length - 1]
        });
    };

    const  handleNavigateNext = () => {
        let index = keys.findIndex(key => key === props.routes.selectedRoute);
        props.dispatch({
            type: 'SET_ROUTE',
            data: keys[index + 1] || keys[0]
        });
    };

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="open points drawer"
                    onClick={props.onMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <div className={classes.grow} />

                {!!props.routes.routes && !!props.routes.labels && <>
                    {isDisableBefore && <Fab size="small" color="secondary" onClick={handleNavigateBefore}>
                        <NavigateBeforeIcon />
                    </Fab>}
                    <Typography>{props.routes.labels[props.routes.selectedRoute]}</Typography>
                    {isDisableNext && <Fab size="small" color="secondary"  onClick={handleNavigateNext}>
                        <NavigateNextIcon />
                    </Fab>}
                </>}

                <div className={classes.grow} />
                <IconButton 
                    color="inherit"
                    onClick={props.onSettingsClick}
                >
                    <SettingsIcon />
                </IconButton>
                {props.settings.takePrioritization && (
                    <IconButton 
                        edge="end" 
                        color="inherit"
                        onClick={props.onPrioritizationClick}
                    >
                        <FindReplaceIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = state => {
    return { 
        settings: state.settings,
        routes: state.routes,
    };
};

export default connect(mapStateToProps)(Settings);