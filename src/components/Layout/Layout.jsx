import React from 'react'
import { Drawer, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import "./Layout.css"
import { useSelector } from 'react-redux';

const drawerWidth = "50%";


function Layout({ children, localUser }) {


    const user = useSelector((state) => state.user);
    console.log(user, "user at drawer");
    console.log(localUser, "lu en drawer");

    const userInitials = localUser?.split(' ').map((n) => n ? n[0].toUpperCase() : '').join('');

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);


    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleMenuClick = (route, shouldClearLocal = false) => {
        window.location.href = route;
        if (shouldClearLocal) {
            localStorage.clear();
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {[
                    { text: 'Home', icon: <HomeIcon />, route: '/home' },
                    { text: 'Profile Card', icon: <FitnessCenterIcon />, route: '/profileCard' },
                    { text: 'Chat', icon: <ChatIcon />, route: '/chat' },
                    { text: 'Log Out', icon: <LogoutIcon />, route: '/', shouldClearLocal: true }
                ].map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => handleMenuClick(item.route, item.shouldClearLocal)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
    const ACI = {
        height: '25px',
        width: '25px',
        color: 'white',
        cursor: 'pointer',
        marginRight: "5%",
        Padding: "0px"
    }

    return (
        <div>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'block' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    cursor='pointer'
                    onClick={() => window.location.href = "/home"}
                    variant="h6" noWrap component="div">
                    One Gym
                </Typography>
                {userInitials === "" ? (
                    <AccountCircleIcon style={ACI} />
                ) : <a className='initials' href='/profile'>{userInitials}</a>}
            </Toolbar>

            <Drawer
                // container={container}
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            <div>{children}</div>
        </div>
    )
}

export default Layout