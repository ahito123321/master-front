import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import InputIcon from '@material-ui/icons/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 10,
        right: 10
    }
}));

function UserControlPannel(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="profile-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={handleMenuClose}>Выход</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <IconButton color="primary" aria-label="profile" onClick={handleProfileMenuOpen}>
                <AssignmentIndIcon />
            </IconButton>
            <IconButton color="primary" aria-label="exit">
                <InputIcon />
            </IconButton>
            {renderProfileMenu}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(UserControlPannel);