// import React, { useEffect, useState } from 'react';
// import './ProfileEdit.css';
// import EditIcon from '@mui/icons-material/Edit';
// import Swal from 'sweetalert2'
// import {
//     Typography, Avatar, Grid, Box, Container, TextField, Button,
//     colors,
//     Grow,
//     Fade,
//     Slide,
//     LinearProgress
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { inputFieldsStyles } from './ProfileEdit'
// import DropDownCategorias from './DropDownCategorias';


// function ProfileEdit({ localUser, BackToTopButton, profilePicture, headerMountIn, contentMountIn, setHeaderMountIn, setContentMountIn, userForTesting, todasLasCategotias }) {

//     const navigate = useNavigate();

//     const [fadeLoad, setfadeLoad] = useState(true)

//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//     function handleInputChange(e, key) {
//         const newValue = e.target.value;
//         setUserForTesting(prevState => ({
//             ...prevState,
//             [key]: newValue,
//         }));
//     }

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener('resize', handleResize);
//         window.scrollTo(0, 0);
//         setTimeout(() => {
//             setfadeLoad(false)
//         }, 900);
//         setTimeout(() => {
//             setHeaderMountIn(true)
//         }, 300);
//         setTimeout(() => {
//             setContentMountIn(true)
//         }, 800);

//         // Cleanup event listener on component unmount
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const typographyStyle = windowWidth >= 375 ? { marginTop: '10px', color: 'rgb(256, 256, 256)' } : { color: '#rgb(256, 256, 256)' };

//     const [dob, setDob] = useState(''); // Initialize state variable for dob

//     const handleDobChange = (event) => {
//         setDob(event.target.value); // Update dob when the input changes
//     };

//     const calculateAge = (dob) => {
//         const birthDate = new Date(dob);
//         const today = new Date();
//         const age = today.getFullYear() - birthDate.getFullYear();
//         const monthDiff = today.getMonth() - birthDate.getMonth();

//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//             return age - 1;
//         }

//         return age;
//     };

//     return (
//         <div
//             className='profileEditDiv'
//         >

//             <Fade in={fadeLoad} timeout={600}>

//                 <Box sx={{ width: '100%' }}>
//                     <LinearProgress />
//                 </Box>

//             </Fade>

//             <Slide
//                 direction="right"
//                 in={headerMountIn}
//                 timeout={500}
//                 mountOnEnter unmountOnExit>


//                 <Box>

//                     <Grid container
//                         justifyContent="space-around"
//                         padding="15px"
//                     >

//                         {/* 
//                 <Grow
//                     in={true}
//                     style={{ transformOrigin: '1 1 1' }}
//                     {...(true ? { timeout: 800 } : {})}
//                 > */}


//                         <Avatar
//                             style={{
//                                 width: '150px',
//                                 height: '150px',
//                                 cursor: 'pointer',
//                                 border: '3px solid rgb(159, 28, 23)'

//                             }}
//                             onClick={() => alert('Futuro cambio de imagen')}
//                             src={localUser.foto} />


//                         <Typography
//                             style={typographyStyle}
//                             variant="h4"
//                             align="center">
//                             {localUser.nombres}
//                             <br />

//                             <p>Guarda tus cambios <br /> antes de continuar! <br /> <EditIcon
//                                 onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} /></p>
//                         </Typography>



//                         {/* </Grow> */}


//                         <Fade
//                             in={contentMountIn}
//                             timeout={800}
//                         >

//                             <Container
//                                 style={{
//                                     margin: "15px",
//                                 }}
//                             >

//                                 <DropDownCategorias
//                                     userForTesting={userForTesting}
//                                     todasLasCategotias={todasLasCategotias}
//                                 />
//                                 <br />

//                                 <form
//                                 >
//                                     <Grid container
//                                     // spacing={0}
//                                     >

//                                         {Object.entries(userForTesting).map(([key, value], index) => {
//                                             if (key !== 'DietPlan' && key !== 'ProfilePicture' && key !== 'Entrenamiento' && key !== 'Name' && key !== 'Email' && key !== 'Premium' && key !== 'Objetivo' && key !== 'Age' && key !== 'Gender') {
//                                                 return (
//                                                     <Grid item xs={12} sm={4}
//                                                         style={{ background: 'black', border: '2px solid rgb(159, 28, 23)', borderRadius: '20px', padding: '8px', color: 'white', margin: '5px' }}
//                                                         key={index}>

//                                                         <h3>{key}:</h3>
//                                                         <input
//                                                             type="text"
//                                                             value={value}
//                                                             onChange={(e) => handleInputChange(e, key)}
//                                                             style={{ color: 'white' }}
//                                                         />

//                                                     </Grid>
//                                                 );
//                                             }
//                                             return null;
//                                         })}


//                                     </Grid>

//                                     <Button
//                                         style={{
//                                             backgroundColor: 'rgb(159, 28, 23)',
//                                             color: 'rgb(255, 255, 255)', // Corrected color value
//                                             fontWeight: 'bold',
//                                             marginTop: '15px',
//                                         }}
//                                         fullWidth
//                                         variant="contained"
//                                         type="submit"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             Swal.fire({
//                                                 title: '¿Estás seguro?',
//                                                 text: "Revisa tus cambios antes de guardarlos!",
//                                                 icon: 'warning',
//                                                 showCancelButton: true,
//                                                 confirmButtonColor: '#3085d6',
//                                                 cancelButtonColor: '#d33',
//                                                 confirmButtonText: 'Sí, estoy seguro!',
//                                                 color: 'rgb(255, 255, 255)',
//                                                 background: "rgb(0,0,0)",
//                                                 backdrop: `rgba(159, 28, 23, 0.4)`
//                                             }).then((result) => {
//                                                 if (result.isConfirmed) {
//                                                     Swal.fire({
//                                                         title: 'Guardado!',
//                                                         text: 'Tu perfil ha sido actualizado',
//                                                         icon: 'success',
//                                                         color: 'rgb(255, 255, 255)',
//                                                         background: "rgb(0,0,0)",
//                                                         backdrop: `rgba(144, 238, 144, 0.4)`
//                                                     }).finally(() => navigate('/profile2'));
//                                                 } else if (result.isDismissed) {
//                                                     Swal.fire({
//                                                         title: 'Cancelado!',
//                                                         text: 'Tu perfil NO ha sido actualizado',
//                                                         icon: 'error',
//                                                         color: 'rgb(255, 255, 255)',
//                                                         background: "rgb(0,0,0)",
//                                                         backdrop: `rgba(159, 28, 23, 0.4)`
//                                                     });
//                                                 }
//                                             });
//                                         }}
//                                     >
//                                         Guardar
//                                     </Button>
//                                 </form>
//                             </Container>
//                         </Fade>
//                     </Grid>
//                     {/* <BackToTopButton /> */}
//                 </Box>
//             </Slide>
//         </div>
//     );
// }

// export default ProfileEdit;


import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './ProfileEdit.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Swal from 'sweetalert2'
import {
    Typography, Avatar, Grid, Box, Container, TextField, Button,
    Grow,
    Slide,
    Fade,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { putUsuario, getGoogle } from '../../redux/actions';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';

const red = {
    50: 'rgb(255, 235, 234)',
    100: 'rgb(255, 204, 203)',
    200: 'rgb(255, 173, 171)',
    300: 'rgb(255, 142, 140)',
    400: 'rgb(255, 111, 109)',
    500: 'rgb(255, 80, 78)',
    600: 'rgb(207, 64, 62)',
    700: 'rgb(159, 48, 46)',
    800: 'rgb(159, 28, 23)',
    900: 'rgb(111, 8, 6)',
};

const green = {
    50: 'rgb(232, 245, 233)',
    100: 'rgb(200, 230, 201)',
    200: 'rgb(165, 214, 167)',
    300: 'rgb(129, 199, 132)',
    400: 'rgb(102, 187, 106)',
    500: 'rgb(76, 175, 80)',
    600: 'rgb(67, 160, 71)',
    700: 'rgb(56, 142, 60)',
    800: 'rgb(46, 125, 50)',
    900: 'rgb(27, 94, 32)',
};

const grey = {
    50: 'rgb(242, 242, 242)',
    100: 'rgb(229, 229, 229)',
    200: 'rgb(216, 216, 216)',
    300: 'rgb(203, 203, 203)',
    400: 'rgb(190, 190, 190)',
    500: 'rgb(177, 177, 177)',
    600: 'rgb(164, 164, 164)',
    700: 'rgb(151, 151, 151)',
    800: 'rgb(146, 144, 144)',
    900: 'rgb(138, 138, 138)',
};

const black = {
    50: 'rgb(46, 46, 46)',
    100: 'rgb(36, 36, 36)',
    200: 'rgb(26, 26, 26)',
    300: 'rgb(16, 16, 16)',
    400: 'rgb(8, 8, 8)',
    500: 'rgb(0, 0, 0)',
    600: 'rgb(0, 0, 0)',
    700: 'rgb(0, 0, 0)',
    800: 'rgb(0, 0, 0)',
    900: 'rgb(0, 0, 0)',
};

const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[400]};
    border: 1px solid ${theme.palette.mode === 'dark' ? red[700] : red[200]};
    color: ${theme.palette.mode === 'dark' ? red[300] : red[900]};
    box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
    z-index: 1;
    `,
);

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? red[600] : red[200]};
      background-color: ${theme.palette.mode === 'dark' ? red[800] : red[100]};
      color: ${theme.palette.mode === 'dark' ? red[300] : red[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? red[700] : red[400]};
    }
    `,
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 20px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: black;
    border: 2px solid rgb(159, 28, 23);
    color: white;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: red[900];
      border-color: red;
    }
  
  
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? red[300] : red[200]};
      outline: none;
    }
    `,
);

const CssTextField = styled(TextField)({
    '& label': {
        color: 'rgb(146, 144, 144)',
    },
    '& label.Mui-focused': {
        color: 'rgb(159, 28, 23)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(159, 28, 23)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '& input': { // Add this block to change the value color
            color: 'rgb(159, 28, 23)',
        },
    },
});


function ProfileEdit({ BackToTopButton, usuario, todasLasCategorias, setReload }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateUser = async () => {
        await getGoogle();
    };

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    async function handleReloadAndNavigate() {
        await setReload(true); // Assuming setReload returns a promise
        navigate('/profile2');
    }

    console.log(todasLasCategorias, 'todasLasCategorias en profileEdit');


    useEffect(() => {

        calculateAge(dob);

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        window.scrollTo(0, 0);

        setTimeout(() => {
            setHeaderMountIn(true);
        }, 300);

        setTimeout(() => {
            setContentMountIn(true);
        }, 600);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    const typographyStyle = windowSize.width >= 360 ? { marginTop: '50px', color: 'rgb(146, 144, 144)' } : { color: 'rgb(146, 144, 144)' };

    const handleNombreChange = (event) => {
        const { name, value } = event.target;
        setUserEdited(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleApellidoChange = (event) => {
        const { name, value } = event.target;
        setUserEdited(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleEdadChange = (event) => {
        console.log(dob, 'dob');

        calculateAge(dob, dob2)
        setEdad(calculateAge(dob, dob2));
        setUserEdited(prevState => ({
            ...prevState,
            fechaNacimiento: event.target.value
        }));
    };
    const handleObjetivosChange = (event) => {
        console.log(event.target.value, 'event.target.value');
        setUserEdited(prevState => {
            const newValue = event.target.value;
            if (prevState.categorias.includes(newValue)) {
                console.log('Objetivo añadido');

                Swal.fire({
                    title: 'Objetivo ya existe!',
                    text: 'Objetivo ya existe en tu lista de objetivos',
                    icon: 'warning',
                    color: 'rgb(255, 255, 255)',
                    background: "rgb(0,0,0)",
                    backdrop: `rgba(159, 28, 23, 0.4)`
                });
                return prevState;
            }
            return {
                ...prevState,
                categorias: [...prevState.categorias, newValue]
            };
        });
    };
    const handleObjetivosChange2 = (event) => {
        setUserEdited(prevState => {
            const newValue = event.target.value;
            if (!prevState.categorias.includes(newValue)) {
                console.log('Objetivo no existe');
                return prevState;
            }
            return {
                ...prevState,
                categorias: prevState.categorias.filter(categoria => categoria !== newValue)
            };
        });
    };
    const handleGeneroChange = (button) => {
        // console.log(event.target.value, 'event.target.value');
        console.log(userEdited.genero, 'userEdited.genero');
        setActiveButton(button);
        setUserEdited(prevState => ({
            ...prevState,
            genero: button
        }));
    };

    const [headerMountIn, setHeaderMountIn] = useState(false)
    const [contentMountIn, setContentMountIn] = useState(false)
    const [activeButton, setActiveButton] = useState(usuario.genero);
    console.log(usuario.genero);
    console.log(usuario);




    const isoDate = usuario.fechaNacimiento;
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const dob = formattedDate

    const calculateAge = (dob, dob2) => {
        console.log(dob2, 'dob2');

        if (dob2) {
            const birthDate = new Date(dob2);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1;
            }

            console.log(age, 'age2');
            return age;
        }
        else if (dob) {
            const birthDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1;
            }

            console.log(age, 'age');
            return age;
        };
    };




    const [userEdited, setUserEdited] = useState({
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        fechaNacimiento: formattedDate,
        categorias: usuario.categorias ? usuario.categorias : [],
        genero: usuario.genero,
        id: usuario.id
    })


    const isoDate2 = userEdited.fechaNacimiento;
    const date2 = new Date(isoDate2);
    const year2 = date2.getUTCFullYear();
    const month2 = String(date2.getUTCMonth() + 1).padStart(2, '0');
    const day2 = String(date2.getUTCDate()).padStart(2, '0');
    const formattedDate2 = `${year2}-${month2}-${day2}`;

    const dob2 = formattedDate2

    const [edad, setEdad] = useState(calculateAge(dob, dob2));
    console.log(edad, 'edad');


    return (

        <div
            // style={{
            //     // height: windowSize.height, 
            //     backgroundImage: 'url(/back10.jpg)',
            //     marginTop: '56px',
            //     backgroundSize: 'cover',
            //     backgroundRepeat: 'no-repeat',
            //     backgroundPosition: 'center'
            // }}
            className='profileEditDiv'
        >

            <Slide
                direction="right"
                in={headerMountIn}
                timeout={500}
                mountOnEnter unmountOnExit>


                <Box
                // sx={{ height: windowSize.height }}
                >



                    <Grid container
                        justifyContent="space-around"
                        padding="15px"
                    // sx={{ height: windowSize.height }}
                    >


                        <Fade
                            in={contentMountIn}
                            timeout={800}
                        >

                            <Card
                                sx={{
                                    backgroundColor: 'rgb(0,0,0)',
                                    borderRadius: '30px',
                                    border: '3px solid rgb(159, 28, 23)',
                                    // width: '80%',
                                    margin: 'auto',
                                    padding: '15px',
                                    boxShadow: '0px 0px 10px 0px rgb(0, 0, 0)'
                                }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{
                                            bgcolor: red[500],
                                            border: '3px solid rgb(159, 28, 23)',
                                            backgroundColor: 'rgb(146, 144, 144)',
                                            width: '100px',
                                            height: '100px',
                                            cursor: 'pointer',
                                        }}
                                            aria-label="recipe"
                                            onClick={() => alert('Futuro cambio de imagen')}
                                        >
                                            <img src={usuario.foto} alt="Avatar" style={{ width: '100%', height: '100%' }} />

                                        </Avatar>

                                    }
                                    title={
                                        <Typography variant="h5" style={{ color: 'gray' }}>
                                            Edita tu perfil
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography variant="subtitle1" style={{ color: 'gray' }}>
                                            Guarda antes de abandonar!
                                        </Typography>
                                    }
                                />
                                <CardContent>
                                    {/* <Typography
                                        variant="h6"
                                        align="center"
                                        color={'rgb(146, 144, 144)'}
                                    >
                                        Confirma tus datos porfavor
                                    </Typography> */}
                                    <Container
                                        style={{

                                        }}
                                    >

                                        {/* <br />

                                <Typography variant="h6" align="center">
                                    Ayudanos con unos datos para conocerte mejor
                                </Typography>

                                <br />
                                <br /> */}

                                        <form
                                        >
                                            <Grid container
                                                spacing={2}
                                            >

                                                {/* {Object.entries(usuario).map(([key, value]) => {
                                            if (key !== 'foto' && key !== 'id' && key !== 'accountType' && key !== 'state') {
                                                return (
                                                    <Grid item key={key} xs={12}>
                                                        <TextField
                                                            InputProps={{
                                                                style: {
                                                                    border: '3px solid rgb(159, 28, 23)',
                                                                    borderRadius: '30px',
                                                                    backgroundColor: 'rgb(146, 144, 144)'
                                                                },
                                                            }}
                                                            fullWidth
                                                            name={key}
                                                            label={key}
                                                            placeholder={`Enter your ${key}`}
                                                        />
                                                    </Grid>
                                                );
                                            }
                                            return null;
                                        })} */}

                                                <Grid item xs={6}>
                                                    {/* <TextField
                                                        InputProps={{
                                                            style: textFieldStyles
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: !!userEdited.nombres || undefined,
                                                        }}
                                                        fullWidth
                                                        name="nombres"
                                                        label="Nombres"
                                                        value={userEdited.nombres}
                                                        onChange={handleNombreChange}
                                                    /> */}
                                                    <CssTextField id="custom-css-outlined-input"
                                                        fullWidth
                                                        name="nombres"
                                                        label="Nombres"
                                                        value={userEdited.nombres}
                                                        onChange={handleNombreChange}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <CssTextField
                                                        fullWidth
                                                        name="apellidos"
                                                        label="Apellidos"
                                                        value={userEdited.apellidos}
                                                        onChange={handleApellidoChange}
                                                    />
                                                </Grid>


                                            </Grid>

                                            <br />

                                            <Grid container
                                                spacing={2}
                                            >

                                                <Grid item
                                                    xs={8}
                                                >
                                                    {/* <Menu> */}
                                                    <CssTextField
                                                        fullWidth
                                                        type="date"
                                                        name="dob"
                                                        label="Fecha de nacimiento"
                                                        value={userEdited.fechaNacimiento}
                                                        onChange={handleEdadChange}
                                                    />
                                                    {/* </Menu> */}
                                                </Grid>

                                                <Grid item
                                                    xs={4}
                                                >
                                                    {/* <Menu> */}
                                                    <CssTextField
                                                        fullWidth
                                                        // type="number"
                                                        name="edad"
                                                        label="Edad"
                                                        value={edad}
                                                    // disabled // Add the disabled prop to make the field not editable
                                                    />
                                                    {/* </Menu> */}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button
                                                        variant="danger"
                                                        size="medium"
                                                        style={{
                                                            backgroundColor: activeButton === 'MUJER' ? 'rgb(159, 28, 23)' : 'rgb(146, 144, 144)',
                                                            color: 'white'
                                                        }}
                                                        onClick={() => handleGeneroChange('MUJER')}
                                                    >
                                                        Mujer
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button
                                                        variant="danger"
                                                        size="medium"
                                                        style={{
                                                            backgroundColor: activeButton === 'HOMBRE' ? 'rgb(159, 28, 23)' : 'rgb(146, 144, 144)',
                                                            color: 'white',
                                                        }}
                                                        onClick={() => handleGeneroChange('HOMBRE')}
                                                    >
                                                        Hombre
                                                    </Button>
                                                </Grid>

                                            </Grid>

                                            <Grid container
                                                spacing={-1}
                                            >

                                                <Grid item xs={6}>
                                                    <Menu>
                                                        {/* <InputLabel style={{ color: 'white' }} htmlFor="name-order-select">Mis objetivos</InputLabel>
                                                        <Select
                                                            sx={{
                                                                backgroundColor: black[500],
                                                                border: '3px solid rgb(159, 28, 23)',
                                                                color: grey[100],
                                                                '&:focus': {
                                                                    outline: `3px solid ${green[200]}`,
                                                                    backgroundColor: grey,
                                                                    color: green[900],
                                                                },
                                                                typography: 'body1',
                                                                // padding: '10px',
                                                            }}
                                                            value={userEdited.categorias}
                                                            onChange={handleObjetivosChange}
                                                            fullWidth
                                                            renderValue={(selected) => (
                                                                <Typography>{selected}</Typography>
                                                            )}
                                                        > */}
                                                        <CssTextField
                                                            fullWidth
                                                            id="outlined-select-objetivos"
                                                            select
                                                            label="Objetivos disponibles"
                                                            value={userEdited.categorias || []}
                                                            onChange={handleObjetivosChange}
                                                        >
                                                            {todasLasCategorias.map((categoria, index) => {
                                                                return (
                                                                    <MenuItem key={index}
                                                                        value={categoria}
                                                                        sx={{
                                                                            backgroundColor: 'rgba(0, 128, 0, 0.1)',
                                                                            typography: 'body1',
                                                                            padding: '10px',
                                                                        }}
                                                                    >
                                                                        <Typography sx={{ color: 'rgb(0, 128, 0)' }}>
                                                                            {categoria.nombre}
                                                                        </Typography>
                                                                    </MenuItem>
                                                                );

                                                            })
                                                            }
                                                        </CssTextField>
                                                    </Menu>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Menu>
                                                        {/* <InputLabel style={{ color: 'white' }} htmlFor="name-order-select">Mis objetivos</InputLabel>
                                                        <Select
                                                            sx={{
                                                                backgroundColor: black[500],
                                                                border: '3px solid rgb(159, 28, 23)',
                                                                color: grey[100],
                                                                '&:focus': {
                                                                    outline: `3px solid ${green[200]}`,
                                                                    backgroundColor: grey,
                                                                    color: green[900],
                                                                },
                                                                typography: 'body1',
                                                                // padding: '10px',
                                                            }}
                                                            value={userEdited.categorias}
                                                            onChange={handleObjetivosChange}
                                                            fullWidth
                                                            renderValue={(selected) => (
                                                                <Typography>{selected}</Typography>
                                                            )}
                                                        > */}
                                                        <CssTextField
                                                            fullWidth
                                                            id="outlined-select-objetivos"
                                                            select
                                                            label="Tus Objetivos"
                                                            value={userEdited.categorias || []}
                                                            onChange={handleObjetivosChange2}
                                                        >
                                                            {userEdited.categorias.map((categoria, index) => {
                                                                return (
                                                                    <MenuItem key={index}
                                                                        value={categoria}
                                                                        sx={{
                                                                            backgroundColor: 'rgba(159, 28, 23, 0.1)',
                                                                            typography: 'body1',
                                                                            padding: '10px',
                                                                        }}
                                                                    >
                                                                        <Typography sx={{ color: 'rgb(159, 28, 23) ' }}>
                                                                            {categoria.nombre}
                                                                        </Typography>
                                                                    </MenuItem>
                                                                );

                                                            })
                                                            }
                                                        </CssTextField>
                                                    </Menu>
                                                </Grid>


                                            </Grid>

                                            <Grid container
                                                spacing={2}
                                            >

                                                <Grid item
                                                    xs={12}
                                                >
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                        onClick={(e) => {
                                                            console.log('Usuario editado', userEdited);
                                                            e.preventDefault();
                                                            Swal.fire({
                                                                title: 'Estas seguro?',
                                                                text: "Revisa tus cambios antes de guardarlos!",
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Si, estoy seguro!',
                                                                color: 'rgb(255, 255, 255)',
                                                                background: "rgb(0,0,0)",
                                                                backdrop: `rgba(159, 28, 23, 0.4)`
                                                            }).then(async (result) => {
                                                                if (result.isConfirmed) {
                                                                    try {
                                                                        const response = await putUsuario(userEdited);
                                                                        console.log('se envio');
                                                                        Swal.fire({
                                                                            title: 'Hecho!',
                                                                            text: 'Tu perfil ha sido actualizado con exito!',
                                                                            icon: 'success',
                                                                            color: 'rgb(255, 255, 255)',
                                                                            background: "rgb(0,0,0)",
                                                                            backdrop: `rgba(144, 238, 144, 0.4)`
                                                                        })
                                                                            .finally(() => handleReloadAndNavigate());


                                                                    } catch (e) {
                                                                        console.error('Error:', e);
                                                                        Swal.fire({
                                                                            title: 'Error!',
                                                                            text: 'Tu perfil no ha sido actualizado, intenta de nuevo!',
                                                                            icon: 'error',
                                                                            color: 'rgb(255, 255, 255)',
                                                                            background: "rgb(0,0,0)",
                                                                            backdrop: `rgba(159, 28, 23, 0.4)`
                                                                        })
                                                                    }
                                                                }
                                                                if (result.isDismissed) {
                                                                    Swal.fire({
                                                                        title: 'Cancelado!',
                                                                        text: 'Tus cambios no han sido guardados, continua con el proceso de actualizacion!',
                                                                        icon: 'warning',
                                                                        color: 'rgb(255, 255, 255)',
                                                                        background: "rgb(0,0,0)",
                                                                        backdrop: `rgba(159, 28, 23, 0.4)`
                                                                    })
                                                                    // .finally(() => navigate('/profile2'));
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        Guardar
                                                    </Button>
                                                </Grid>


                                                {/* <Grid item
                                                    xs={6}
                                                >
                                                    <Button
                                                        style={{ backgroundColor: 'rgb(159, 28, 23)' }}
                                                        fullWidth
                                                        variant="contained"
                                                        type="submit"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            Swal.fire({
                                                                title: 'Estas seguro?',
                                                                text: "Perderas los cambios no guardados!",
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Si, estoy seguro!',
                                                                color: 'rgb(255, 255, 255)',
                                                                background: "rgb(0,0,0)",
                                                                backdrop: `rgba(159, 28, 23, 0.4)`
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    navigate('/profile2');
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        Volver
                                                    </Button>
                                                </Grid> */}

                                            </Grid>
                                        </form>
                                    </Container>
                                </CardContent>

                            </Card>





                        </Fade>
                    </Grid>
                    <BackToTopButton />
                </Box>
            </Slide>
        </div >
    );
}

export default ProfileEdit;