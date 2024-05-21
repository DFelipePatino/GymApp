import React from 'react'
import { useLocation } from 'react-router-dom';
import { Drawer, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getCardio, getContacto, getPilates, getCrossfit, getBoxing, getYoga } from '../../redux/actions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
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
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import "./Layout.css"
import { useDispatch, useSelector } from 'react-redux';
import { setHomeContent } from '../../redux/actions';

const drawerWidth = "50%";


function Layout({ children, localUser }) {

    const dispatch = useDispatch();
    const location = useLocation();

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


    const handleMenuClick = (fn, route, shouldClearLocal = false) => {

        if (fn === 'clear') { localStorage.removeItem("homeContent") }

        if (fn === 'homePilates') { localStorage.setItem("homeContent", "Pilates"), dispatch(getPilates()) }
        if (fn === 'homeCardio') { localStorage.setItem("homeContent", "Cardio"), dispatch(getCardio()) }
        if (fn === 'homeYoga') { localStorage.setItem("homeContent", "Yoga"), dispatch(getYoga()) }
        if (fn === 'homeContacto') { localStorage.setItem("homeContent", "Contacto"), dispatch(getContacto()) }
        if (fn === 'homeBoxing') { localStorage.setItem("homeContent", "Boxing"), dispatch(getBoxing()) }
        if (fn === 'homeCrossfit') { localStorage.setItem("homeContent", "Crossfit"), dispatch(getCrossfit()) }

        if (location.pathname !== '/home') {
            window.location.href = route;
        } else if (location.pathname === '/home' && !fn) {
            window.location.href = route;
        }

        if (shouldClearLocal) {
            localStorage.clear();
            window.location.href = route;
        }

    };

    let drawer;

    if (location.pathname === "/home") {
        drawer = (
            <div>
                <Toolbar />
                <List>
                    {[
                        // { text: 'Home', icon: <HomeIcon />, fn: "clear", route: '/home' },
                        // { text: 'Profile Card', icon: <AccountCircleIcon />, route: '/profileCard' },

                        { text: 'Chat', icon: <ChatIcon />, route: '/chat' },


                        { text: 'Log Out', icon: <LogoutIcon />, route: '/', shouldClearLocal: true }

                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => handleMenuClick(item.fn, item.route, item.shouldClearLocal)}>
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
    }
    else if (location.pathname !== "/home") {


        drawer = (
            <div>
                <Toolbar />
                <List>
                    {[
                        // { text: 'Home', icon: <HomeIcon />, fn: "clear", route: '/home' },
                        // { text: 'Profile Card', icon: <AccountCircleIcon />, route: '/profileCard' },

                        { text: 'Pilates', icon: <FitnessCenterIcon />, fn: 'homePilates', route: '/home' },
                        { text: 'Cardio', icon: <DirectionsBikeIcon />, fn: 'homeCardio', route: '/home' },
                        { text: 'Yoga', icon: <SelfImprovementIcon />, fn: 'homeYoga', route: '/home' },
                        { text: 'Contacto', icon: <SportsGymnasticsIcon />, fn: 'homeContacto', route: '/home' },
                        { text: 'Boxing', icon: <SportsKabaddiIcon />, fn: 'homeBoxing', route: '/home' },
                        { text: 'Crossfit', icon: <SportsHandballIcon />, fn: 'homeCrossfit', route: '/home' },

                        <Divider />,

                        { text: 'Chat', icon: <ChatIcon />, route: '/chat' },

                        <Divider />,

                        { text: 'Log Out', icon: <LogoutIcon />, route: '/', shouldClearLocal: true }

                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => handleMenuClick(item.fn, item.route, item.shouldClearLocal)}>
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
    }

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
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        localStorage.removeItem("homeContent");
                        window.location.href = "/home";
                    }}
                    variant="h6" noWrap component="div">
                    One Gym
                </Typography>
                {userInitials === "" ? (
                    <AccountCircleIcon style={ACI} />
                ) : <a className='initials' href='/profile2'>{userInitials}</a>}
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