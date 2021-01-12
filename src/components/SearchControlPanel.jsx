import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import googleService from '../services/googleService';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        maxWidth: 400,
        minWidth: 320,
        position: 'absolute',
        top: 10,
        left: 10
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    linearProgress: {
        width: 'calc(100% + 8px)',
        left: '-4px',
        bottom: '-2px'
    },
    resultContainer: {
        maxHeight: '300px',
        overflow: 'auto'
    }
}));

function SearchControlPanel(props) {
    const classes = useStyles();
    const [ state, setState ] = React.useState({
        searchText: '',
        timeout: 0,
        isLoaded: false,
    });

    const handleMenuClick = event => {
        if (props.onMenuClick) {
            props.onMenuClick(event);
        }
    };

    const handleSearchTextChange = event => {
        clearTimeout(state.timeout);
        let value = event.target.value;
        let timeout;

        if (value !== '') {
            timeout = setTimeout(() => {
                if (props.onChangeSearchText) {
                    props.onChangeSearchText(value);
                }
            }, 500);
        }

        setState({
            ...state,
            timeout: timeout,
            searchText: value
        });
    };    

    if (!props.display) {
        return <></>;
    }    

    return (
        <Paper className={classes.root}>
            <div className={classes.container}>
                <IconButton className={classes.iconButton} aria-label="menu" onClick={handleMenuClick}>
                    <MenuIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleSearchTextChange}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <Badge 
                        badgeContent={props.pointsLength}
                        invisible={props.pointsLength < 1} 
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
            {state.isLoaded && <LinearProgress variant="query" className={classes.linearProgress} />}
            <div className={classes.resultContainer}>
                
            </div>
        </Paper>
    );
}

export default SearchControlPanel;