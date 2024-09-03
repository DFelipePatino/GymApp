import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import "./Layout.css"
import { iconStyles, iconStyles2 } from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const drawerWidth = "50%";


function Layout({ usuario, setPlayerLoad, setHeaderLoad, setBannerload, setFilterLoad, setHeaderMountIn, setContentMountIn, navigateAway, setNavigateAway, scrollToFilter1, scrollToCardio, scrollToEstiramiento, scrollToFilter4, scrollToTodos, setInfoPremium, infoPremium, activeButton,
    setActiveButton }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const currentIndex = useSelector((state) => state.rutinaID);
    const currentProgress = useSelector((state) => state.currentProgress);

    const localUserName = usuario?.nombres + ' ' + usuario?.apellidos;

    const userInitials = localUserName?.split(' ').map((n) => n ? n[0].toUpperCase() : '').join('');


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

            case 'Cardio':
                localStorage.setItem("homeContent", "Cardio");
                scrollToCardio();
                console.log('scrolling to filter 2 layout');
                break;

            case 'Estiramiento':
                localStorage.setItem("homeContent", "Estiramiento");
                scrollToEstiramiento();
                break;

            case 'Todos':
                localStorage.setItem("homeContent", "Todos");
                scrollToTodos();
                break;

            case 'Premium':
                window.scroll({ top: 0, behavior: 'smooth' });
                setHeaderMountIn(false);
                setTimeout(() => {
                    setInfoPremium(true)
                }, 400);
                setTimeout(() => {
                    setHeaderMountIn(true)
                }, 800);
                break;

            case 'wa':
                const whatsappUrl = 'https://api.whatsapp.com/send/?phone=%2B573107709118&text=Hola+David%2C+soy+usuario+One&type=phone_number&app_absent=0';
                const anchor = document.createElement('a');
                anchor.href = whatsappUrl;
                anchor.target = '_blank';
                anchor.click();
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


    const homeNavButtons = [
        {
            text: currentProgress?.entrenamientoId ? 'Mi entrenamiento actual' : null,
            icon: currentProgress?.entrenamientoId ? <KeyboardArrowRightIcon
                style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
            /> : null,
            fn: currentProgress?.entrenamientoId ? "Mi entrenamiento actual" : null,
            route: currentProgress?.entrenamientoId ? `/player/${currentProgress?.entrenamientoId}` : null,
            id: '1'
        },
        // {
        //     text: 'Mi Seleccion',
        //     icon: <KeyboardArrowRightIcon
        //         style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
        //     />,
        //     fn: "Tu Seleccion",
        //     route: '/home',
        //     id: '2'
        // },
        {
            text: 'Todos',
            icon: <KeyboardArrowRightIcon
                style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
            />,
            fn: "Todos",
            route: '/home',
            id: '6'
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

    ];

    let drawer;

    if (
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
                                />, fn: "clear", route: '/home', id: '0'
                            },

                            { type: 'divider', id: 'divider-1' },

                            ...homeNavButtons,

                            { type: 'divider', id: 'divider-2' },

                            {
                                text: 'WA', icon: <WhatsAppIcon
                                    style={iconStyles2}
                                />, fn: "wa", id: '8'
                            },

                            {
                                text: 'Premium', icon: <WorkspacePremiumIcon
                                    style={iconStyles2}
                                />, route: '/paytoupgrade', shouldClearLocal: false, id: '10', fn: 'Premium'
                            },

                            { type: 'divider', id: 'divider-5' },
                            { type: 'divider', id: 'divider-6' },

                            {
                                text: 'Log Out', icon: <LogoutIcon
                                    style={iconStyles}
                                />, route: '/', shouldClearLocal: true, id: '9'
                            },




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
                                        <ListItemText primary={<Typography
                                            style={{ color: 'rgb(256, 256, 256)' }}
                                            variant="body2">{item.text}</Typography>} />
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
                            height: '10px', margin: '10px 0', color: 'rgb(256, 256, 256)'
                        }} />

                    <p
                        style={{ color: 'rgb(256, 256, 256)', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}
                    >Guarda tus cambios antes de abandonar esta pagina!</p>

                    <Divider
                        style={{
                            height: '10px', margin: '10px 0', color: 'rgb(256, 256, 256)'
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
                            confirmButtonText: 'Log Out!',
                            color: 'rgb(255, 255, 255)',
                            background: "rgb(0,0,0)",
                            backdrop: `rgba(159, 28, 23, 0.4)`
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
                        <ListItemText
                            style={{ color: 'rgb(256, 256, 256)' }}
                            primary="Log Out" />
                    </ListItemButton>

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
                    backgroundColor: 'rgb(0, 0, 0)',
                    color: 'rgb(159, 28, 23)',

                    display: 'flex',
                    justifyContent: 'space-between',
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


                        if (location.pathname.includes('/player')) {
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
                                confirmButtonText: 'Confirmar!',
                                color: 'rgb(255, 255, 255)',
                                background: "rgb(0,0,0)",
                                backdrop: `rgba(159, 28, 23, 0.4)`
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    navigate('/home')
                                }
                            });
                        }

                        if (location.pathname === '/profile' || location.pathname === '/paytoupgrade') {
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
                    <button
                        className='initials'
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });

                            if (location.pathname === '/home') {
                                setActiveButton('');
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
                                    navigate('/profile')
                                }, 600);
                            }

                            if (location.pathname === '/profile' && infoPremium) {
                                window.scroll({ top: 0, behavior: 'smooth' });
                                setHeaderMountIn(false);
                                setTimeout(() => {
                                    setInfoPremium(false)
                                }, 400);
                                setTimeout(() => {
                                    setHeaderMountIn(true)
                                }, 800);
                            }

                            if (location.pathname.includes('/player') || location.pathname === '/paytoupgrade') {
                                setActiveButton('');
                                setNavigateAway(false);
                                setPlayerLoad(false);
                                setTimeout(() => {
                                    setHeaderMountIn(false);
                                }, 200);
                                setTimeout(() => {
                                    setContentMountIn(false)
                                }, 300);

                                setTimeout(() => {
                                    navigate('/profile')
                                }, 500);

                            }

                            if (location.pathname === '/profileedit') {
                                Swal.fire({
                                    title: 'Estas seguro?',
                                    text: "Perderas los cambios no guardados!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Confirmar!',
                                    color: 'rgb(255, 255, 255)',
                                    background: "rgb(0,0,0)",
                                    backdrop: `rgba(159, 28, 23, 0.4)`
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
                                            navigate('/profile')
                                        }, 500);
                                    }
                                });
                            }
                        }}
                    >
                        <img src={usuario?.foto} alt={userInitials}
                            style={ACI}
                        />
                    </button>
                }
            </Toolbar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '100%', backgroundColor: 'rgb( 0, 0, 0)', },
                }}
            >
                {drawer}
            </Drawer>
        </div >
    )
}

export default Layout