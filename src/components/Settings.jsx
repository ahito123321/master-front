import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import SettingsIcon from '@material-ui/icons/Settings';

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
}));

function Settings(props) {
    const classes = useStyles();

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
        settings: state.settings
    };
};

export default connect(mapStateToProps)(Settings);