import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
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
import Swal from 'sweetalert2'

const drawerWidth = "50%";


function Layout({ localUser, setPlayerLoad, playerLoad, headerLoad, bannerLoad, filterLoad, setHeaderLoad, setBannerload, setFilterLoad, headerMountIn, contentMountIn, setHeaderMountIn, setContentMountIn, navigateAway, setNavigateAway }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

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
            navigate(route);
            handleDrawerClose()
        } else if (location.pathname === '/home' && !fn) {
            navigate(route);
            handleDrawerClose()
        }

        if (shouldClearLocal) {
            localStorage.clear();
            navigate(route);
            handleDrawerClose()
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

                        { text: 'Chat', icon: <ChatIcon />, route: '/chat', id: '1' },


                        { text: 'Log Out', icon: <LogoutIcon />, route: '/', shouldClearLocal: true, id: '2' }

                    ].map((item, index) => (
                        <ListItem key={item.id} disablePadding>
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

    if (location.pathname !== "/home" && location.pathname !== "/profileedit") {

        drawer = (
            <div>
                <Toolbar />
                <List>
                    {[
                        { text: 'Home', icon: <HomeIcon />, fn: "clear", route: '/home', id: '1' },

                        { type: 'divider', id: 'divider-1' },

                        { text: 'Pilates', icon: <FitnessCenterIcon />, fn: 'homePilates', route: '/home', id: '2' },
                        { text: 'Cardio', icon: <DirectionsBikeIcon />, fn: 'homeCardio', route: '/home', id: '3' },
                        { text: 'Yoga', icon: <SelfImprovementIcon />, fn: 'homeYoga', route: '/home', id: '4' },
                        { text: 'Contacto', icon: <SportsGymnasticsIcon />, fn: 'homeContacto', route: '/home', id: '5' },
                        { text: 'Boxing', icon: <SportsKabaddiIcon />, fn: 'homeBoxing', route: '/home', id: '6' },
                        { text: 'Crossfit', icon: <SportsHandballIcon />, fn: 'homeCrossfit', route: '/home', id: '7' },

                        { type: 'divider', id: 'divider-2' },

                        { text: 'Chat', icon: <ChatIcon />, route: '/chat', id: '8' },
                        { text: 'Log Out', icon: <LogoutIcon />, route: '/', shouldClearLocal: true, id: '9' }
                    ].map((item, index) => (
                        item.type === 'divider' ?
                            <Divider key={item.id} component="li" aria-hidden="true"
                                style={{
                                    height: '10px', margin: '10px 0'
                                }}
                            /> :
                            <ListItem key={item.id} disablePadding>
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

    else if (location.pathname === "/profileedit") {
        drawer = (
            <div>
                <Toolbar />
                <List>




                    <Divider
                        style={{
                            height: '10px', margin: '10px 0'
                        }} />
                    Guarda tus cambios antes de abandonar esta pagina!
                    <Divider
                        style={{
                            height: '10px', margin: '10px 0'
                        }} />

                    <ListItemButton onClick={() => {
                        handleDrawerClose()
                        Swal.fire({
                            title: 'Estas seguro que deseas cerrar sesion?',
                            text: "Perderas los cambios no guardados!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Log Out!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.clear();
                                navigate('/');
                            }
                        });

                    }}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                    {/* 
                <IconButton>
                    <LogoutIcon />
                    <ListItemText primary="Log Out" />

                </IconButton> */}

                </List>
            </div >
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
        <div
            style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}
        >

            <Toolbar
                style={{
                    backgroundColor: '#426E92',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    /* position: sticky;
                    top: 10px; */
                    alignItems: 'center',
                    padding: '0 20px',
                }}
            >
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

                        if (location.pathname === '/player') {
                            setPlayerLoad(false);
                            setTimeout(() => {
                                navigate("/home");
                            }, 200);
                        }

                        if (location.pathname === '/profileedit') {
                            Swal.fire({
                                title: 'Estas seguro?',
                                text: "Perderas los cambios no guardados!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Confirmar!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate('/home')
                                }
                            });
                        }

                        if (location.pathname === '/profile2') {
                            setNavigateAway(true);
                            setTimeout(() => {
                                setHeaderMountIn(false);
                            }, 200);
                            setTimeout(() => {
                                setContentMountIn(false)
                            }, 300);

                            setTimeout(() => {
                                navigate('/home')
                            }, 500);
                        }


                        else if (location.pathname === '/home') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }
                    }
                    variant="h6" noWrap component="div">
                    One Gym
                </Typography>
                {userInitials === "" ? (
                    <AccountCircleIcon style={ACI} />
                ) :
                    // <a className='initials' href='/profile2'>{userInitials}</a>
                    <button
                        className='initials'
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            if (location.pathname === '/home') {
                                setNavigateAway(false);
                                setTimeout(() => {
                                    setHeaderLoad(false);
                                }, 200);
                                setTimeout(() => {
                                    setBannerload(false);
                                }, 300);
                                setTimeout(() => {
                                    setFilterLoad(false);
                                }, 400);
                                setTimeout(() => {
                                    navigate('/profile2')
                                }, 600);
                            }
                            if (location.pathname === '/player') {
                                setNavigateAway(false);
                                setPlayerLoad(false);
                                setTimeout(() => {
                                    navigate('/profile2')
                                }, 200);
                            }

                            if (location.pathname === '/profileedit') {
                                Swal.fire({
                                    title: 'Estas seguro?',
                                    text: "Perderas los cambios no guardados!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Confirmar!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        setNavigateAway(false);
                                        setTimeout(() => {
                                            setHeaderMountIn(false)
                                        }, 200);
                                        setTimeout(() => {
                                            setContentMountIn(false)
                                        }, 300);
                                        setTimeout(() => {
                                            navigate('/profile2')
                                        }, 500);
                                    }
                                });
                            }
                        }}
                    >
                        {userInitials}
                    </button>
                }
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
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '100%' },
                }}
            >
                {drawer}
            </Drawer>

            {/* <div>{children}</div> */}

        </div >
    )
}

export default Layout