import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getMetodo1, getMetodo2, getMetodo3, getMetodo4, getMetodo5, getMetodo6 } from '../../redux/actions';
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
import { iconStyles, iconStyles2 } from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { setHomeContent } from '../../redux/actions';
import Swal from 'sweetalert2'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const drawerWidth = "50%";


function Layout({ localUser, setPlayerLoad, setHeaderLoad, setBannerload, setFilterLoad, setHeaderMountIn, setContentMountIn, navigateAway, setNavigateAway, scrollToFilter1, scrollToFilter2, scrollToFilter3, scrollToFilter4, scrollToFilter5 }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const resultsData = useSelector((state) => state.results.data);
    const currentIndex = useSelector((state) => state.rutinaID);
    // console.log(resultsData, 'resultsData en layout');

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

        switch (fn) {
            case 'homeM1':
                localStorage.setItem("homeContent", "Metodo 1");
                dispatch(getMetodo1(currentIndex));
                break;
            case 'homeM2':
                localStorage.setItem("homeContent", "Metodo 2");
                dispatch(getMetodo1(currentIndex));
                break;
            case 'homeM3':
                localStorage.setItem("homeContent", "Metodo 3");
                dispatch(getMetodo1(currentIndex));
                break;
            case 'homeM4':
                localStorage.setItem("homeContent", "Metodo 4");
                dispatch(getMetodo1(currentIndex));
                break;
            case 'homeM5':
                localStorage.setItem("homeContent", "Metodo 5");
                dispatch(getMetodo1(currentIndex));
                break;
            case 'homeM6':
                localStorage.setItem("homeContent", "Metodo 6");
                dispatch(getMetodo1(currentIndex));
                break;
            case 'Tu Seleccion':
                localStorage.setItem("homeContent", "Tu Seleccion");
                scrollToFilter1();
                dispatch(getMetodo1(currentIndex));
                break;
            case 'Estiramiento':
                localStorage.setItem("homeContent", "Estiramiento");
                scrollToFilter2();
                dispatch(getMetodo1(currentIndex));
                break;
            case 'Tips Alimentacion':
                localStorage.setItem("homeContent", "Tips Alimentacion");
                scrollToFilter3();
                dispatch(getMetodo1(currentIndex));
                break;
            case 'Cardio':
                localStorage.setItem("homeContent", "Cardio");
                scrollToFilter4();
                dispatch(getMetodo1(currentIndex));
                break;
            case 'Todos':
                localStorage.setItem("homeContent", "Todos");
                scrollToFilter5();
                dispatch(getMetodo1(currentIndex));
                break;
            default:
                localStorage.removeItem("homeContent")
                break;
        }

        if (location.pathname === '/home') {
            navigate(route);
            handleDrawerClose()
        }

        if (location.pathname !== '/home') {
            console.log('not home');
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

    const mappedData = resultsData?.map((item, index) => ({
        text: item.nombre,
        icon: <DirectionsBikeIcon style={iconStyles} />, // replace with your actual icon logic
        fn: `homeM${index + 1}`,
        // fn: 'homeM1',
        route: '/home',
        shouldClearLocal: false,
        id: item.id.toString(),
    }));

    const homeNavButtons = [
        {
            text: 'Tu Seleccion',
            icon: <KeyboardArrowRightIcon
                style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
            />,
            fn: "Tu Seleccion",
            route: '/home',
            id: '2'
        },
        {
            text: 'Cardio',
            icon: <KeyboardArrowRightIcon
                style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
            />,
            fn: "Cardio",
            route: '/home',
            id: '3'
        },
        {
            text: 'Estiramiento',
            icon: <KeyboardArrowRightIcon
                style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
            />,
            fn: "Estiramiento",
            route: '/home',
            id: '4'
        },
        {
            text: 'Tips Alimentacion',
            icon: <KeyboardArrowRightIcon
                style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
            />,
            fn: "Tips Alimentacion",
            route: '/home',
            id: '5'
        },
        {
            text: 'Todos',
            icon: <KeyboardArrowRightIcon
                style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
            />,
            fn: "Todos",
            route: '/home',
            id: '6'
        },
    ];

    let drawer;

    // if (location.pathname === "/home") {
    //     drawer = (
    //         <div
    //             style={{
    //                 backgroundColor: 'rgb(146, 144, 144)',
    //             }}
    //         >
    //             <Toolbar />
    //             <List>
    //                 {[
    //                     // { text: 'Home', icon: <HomeIcon />, fn: "clear", route: '/home' },
    //                     // { text: 'Profile Card', icon: <AccountCircleIcon />, route: '/profileCard' },

    //                     {
    //                         text: 'Chat', icon: <ChatIcon
    //                             style={iconStyles2}
    //                         />, route: '/chat', id: '1'
    //                     },


    //                     {
    //                         text: 'Log Out', icon: <LogoutIcon
    //                             style={iconStyles}
    //                         />, route: '/', shouldClearLocal: true, id: '2'
    //                     }

    //                 ].map((item, index) => (
    //                     <ListItem key={item.id} disablePadding>
    //                         <ListItemButton onClick={() => handleMenuClick(item.fn, item.route, item.shouldClearLocal)}>
    //                             <ListItemIcon>
    //                                 {item.icon}
    //                             </ListItemIcon>
    //                             <ListItemText primary={item.text} />
    //                         </ListItemButton>
    //                     </ListItem>
    //                 ))}
    //             </List>
    //         </div>
    //     );
    // }

    if (
        // location.pathname !== "/home" && 
        location.pathname !== "/profileedit") {
        drawer = (
            <div>
                <Toolbar />
                <List>
                    {
                        [
                            {
                                text: 'Home', icon: <HomeIcon
                                    style={iconStyles2}
                                />, fn: "clear", route: '/home', id: '1'
                            },

                            { type: 'divider', id: 'divider-1' },

                            // ...mappedData, // spread mappedData into the parent array

                            ...homeNavButtons,


                            { type: 'divider', id: 'divider-2' },

                            {
                                text: 'Chat', icon: <ChatIcon
                                    style={iconStyles2}
                                />, route: '/chat', id: '8'
                            },
                            {
                                text: 'Log Out', icon: <LogoutIcon
                                    style={iconStyles}
                                />, route: '/', shouldClearLocal: true, id: '9'
                            }

                        ].map((item, index) => (
                            item.type === 'divider' ?
                                <Divider key={item.id} component="li" aria-hidden="true"
                                    style={{
                                        height: '10px', margin: '10px 0', color: 'rgb(159, 28, 23)'
                                    }}
                                /> :
                                <ListItem key={item.id} disablePadding>
                                    <ListItemButton onClick={() => handleMenuClick(item.fn, item.route, item.shouldClearLocal)}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={<Typography variant="body2">{item.text}</Typography>} />
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
                            <LogoutIcon
                                style={iconStyles}
                            />
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
        // color: 'white',
        color: 'rgb(159, 28, 23)',
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
                    // backgroundColor: 'rgb(146, 144, 144)',
                    backgroundColor: 'rgb(0, 0, 0)',
                    // backgroundColor: 'rgb(159, 28, 23)',
                    // color: 'white',
                    color: 'rgb(159, 28, 23)',
                    // color: 'rgb(146, 144, 144)',
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
                    variant="h5" noWrap component="div"
                    style={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: 'rgb(256, 256, 256)'
                        // color: 'rgb(156, 28, 23)'
                    }}
                    onClick={() => { //this is for the home button

                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        localStorage.removeItem("homeContent");


                        if (location.pathname === '/player') {
                            setPlayerLoad(false);
                            setTimeout(() => {
                                navigate("/home");
                            }, 300);
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
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    navigate('/home')
                                }
                            });
                        }

                        if (location.pathname === '/profile2') {
                            // setNavigateAway(true);
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
                >
                    One
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
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '100%', backgroundColor: 'rgb(146, 144, 144)', },
                }}
            >
                {drawer}
            </Drawer>

            {/* <div>{children}</div> */}

        </div >
    )
}

export default Layout